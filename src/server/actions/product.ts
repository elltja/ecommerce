'use server';

import { deleteUploadedFile } from '../cloudinary';
import { db } from '../db';

const PRODUCT_IMAGES_FOLDER_NAME = 'product-media';

export async function deleteProduct(id: string) {
  const productImages = await db.productImage.findMany({
    where: { productId: id },
    select: { url: true },
  });
  for (const { url } of productImages) {
    await deleteUploadedFile(url, PRODUCT_IMAGES_FOLDER_NAME);
  }
  await db.product.delete({
    where: { id },
  });
}
