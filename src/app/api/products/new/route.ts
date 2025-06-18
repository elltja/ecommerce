import { NextResponse, type NextRequest } from 'next/server';
import { type z } from 'zod';
import {
  type productSchema,
  validateProductData,
} from '~/lib/validators/products';
import { canCreateProduct } from '~/permissions/product';
import { auth } from '~/server/auth';
import { db } from '~/server/db';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const priceInDollars = formData.get('priceInDollars') as string;
  const description = formData.get('description') as string;

  const fields = {
    title: title || undefined,
    slug: slug || undefined,
    priceInDollars: priceInDollars || undefined,
    description: description || undefined,
  };

  const { success, data, errors } = validateProductData(fields);

  if (!success || !data) {
    return NextResponse.json(
      { message: 'Invalid form fields', errors },
      { status: 400 },
    );
  }
  const session = await auth();

  if (!session || !canCreateProduct({ role: session?.user.role })) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  // TODO
  await createProduct(data, session?.user.id);

  return NextResponse.json(
    { message: 'Successfully created product' },
    { status: 201 },
  );
}

async function createProduct(
  data: z.infer<typeof productSchema>,
  createdById: string,
) {
  const { priceInDollars, ...productData } = data;

  const priceInCents = priceInDollars * 100;

  await db.product.create({
    data: { ...productData, priceInCents, createdById },
  });
}
