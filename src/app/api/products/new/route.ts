import { NextResponse, type NextRequest } from 'next/server';
import { type z } from 'zod';
import {
  type productSchema,
  validateProductData,
} from '~/lib/validators/products';
import { canCreateProduct } from '~/permissions/product';
import { auth } from '~/server/auth';
import { getCloudinaryUrl, uploadFile } from '~/server/cloudinary';
import { db } from '~/server/db';

const PRODUCT_IMAGES_FOLDER_NAME = 'product-media';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const parsedFields = parseFormFields(formData);

  const { success, data, errors } = validateProductData(parsedFields);
  if (!success || !data) {
    return badRequest('Invalid form fields', errors);
  }

  const session = await auth();
  if (!session || !canCreateProduct({ role: session.user.role })) {
    return unauthorized();
  }

  const images = formData.getAll('images');
  const imageUrls = await uploadFiles(images);

  await createProduct(data, imageUrls, session.user.id);

  return NextResponse.json(
    { message: 'Successfully created product' },
    { status: 201 },
  );
}

function parseFormFields(formData: FormData) {
  return {
    title: (formData.get('title') as string) || undefined,
    slug: (formData.get('slug') as string) || undefined,
    priceInDollars: (formData.get('priceInDollars') as string) || undefined,
    description: (formData.get('description') as string) || undefined,
  };
}

async function uploadFiles(files: unknown[]) {
  const urls = await Promise.all(
    files.map(async (file) => {
      if (!(file instanceof File)) return null;
      const publicId = await uploadFile(file, PRODUCT_IMAGES_FOLDER_NAME);
      return getCloudinaryUrl(publicId);
    }),
  );
  return urls.filter((url): url is string => url !== null);
}

async function createProduct(
  data: z.infer<typeof productSchema>,
  imageUrls: string[],
  createdById: string,
) {
  const { priceInDollars, ...rest } = data;
  const priceInCents = Math.round(priceInDollars * 100);

  const product = await db.product.create({
    data: { ...rest, priceInCents, createdById },
  });

  if (imageUrls.length > 0) {
    await db.productImage.createMany({
      data: imageUrls.map((url, idx) => ({
        url,
        productId: product.id,
        altText: `${product.title}, image ${idx + 1}`,
        position: idx,
      })),
    });
  }
}

function badRequest(message: string, errors?: unknown) {
  return NextResponse.json({ message, errors }, { status: 400 });
}

function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}
