import { NextResponse, type NextRequest } from 'next/server';
import type { z } from 'zod';
import {
  type productSchema,
  validateProductData,
} from '~/lib/validators/products';
import { canUpdateProduct } from '~/permissions/product';
import { auth } from '~/server/auth';
import {
  deleteUploadedFile,
  getCloudinaryUrl,
  uploadFile,
} from '~/server/cloudinary';
import { db } from '~/server/db';

const PRODUCT_IMAGES_FOLDER_NAME = 'product-media';

export async function PUT(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get('id');
  if (!productId) {
    return badRequest('Missing product ID');
  }

  const formData = await request.formData();
  const parsedFields = parseFormFields(formData);

  const { success, data, errors } = validateProductData(parsedFields);
  if (!success || !data) {
    return badRequest('Invalid form fields', errors);
  }

  const session = await auth();
  if (!session || !canUpdateProduct({ role: session.user.role })) {
    return unauthorized();
  }

  const existingProduct = await db.product.findUnique({
    where: { id: productId },
  });
  if (!existingProduct) {
    return notFound('Product not found');
  }

  const images = formData.getAll('images');
  const existingImageSources = formData.getAll(
    'existingImageSources',
  ) as string[];
  const uploadedImageUrls = await uploadFiles(images);

  await syncProductImages({
    productId,
    currentUrls: [...existingImageSources, ...uploadedImageUrls],
  });

  await updateProduct(data, productId);

  return NextResponse.json({ message: 'Successfully updated product' });
}

// -- Utilities --

function parseFormFields(formData: FormData) {
  return {
    title: (formData.get('title') as string) || undefined,
    slug: (formData.get('slug') as string) || undefined,
    priceInDollars: (formData.get('priceInDollars') as string) || undefined,
    description: (formData.get('description') as string) || undefined,
  };
}

async function updateProduct(data: z.infer<typeof productSchema>, id: string) {
  const { priceInDollars, ...productData } = data;
  const priceInCents = Math.round(priceInDollars * 100);

  await db.product.update({
    where: { id },
    data: { ...productData, priceInCents },
  });
}

async function uploadFiles(files: unknown[]) {
  const fileUrls = await Promise.all(
    files.map(async (file) => {
      if (!(file instanceof File)) {
        if (typeof file === 'string' && (await imageExists(file))) {
          return file;
        }
        return null;
      }

      const publicId = await uploadFile(file, PRODUCT_IMAGES_FOLDER_NAME);
      const url = getCloudinaryUrl(publicId);

      return (await imageExists(url)) ? null : url;
    }),
  );

  return fileUrls.filter((url): url is string => url !== null);
}

async function imageExists(url: string) {
  const count = await db.productImage.count({ where: { url } });
  return count > 0;
}

async function syncProductImages({
  productId,
  currentUrls,
}: {
  productId: string;
  currentUrls: string[];
}) {
  const imagesToDelete = await db.productImage.findMany({
    where: { productId, url: { notIn: currentUrls } },
    select: { id: true, url: true },
  });

  await Promise.all(
    imagesToDelete.map(async ({ id, url }) => {
      await deleteUploadedFile(url, PRODUCT_IMAGES_FOLDER_NAME);
      await db.productImage.delete({ where: { id } });
    }),
  );

  await db.productImage.deleteMany({ where: { productId } });

  await db.productImage.createMany({
    data: currentUrls.map((url) => ({ url, productId })),
    skipDuplicates: true,
  });
}

function badRequest(message: string, errors?: unknown) {
  return NextResponse.json({ message, errors }, { status: 400 });
}

function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

function notFound(message: string) {
  return NextResponse.json({ message }, { status: 404 });
}
