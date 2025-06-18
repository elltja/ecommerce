'use server';

import { db } from '../db';

export async function deleteProduct(id: string) {
  await db.product.delete({
    where: { id },
  });
}
