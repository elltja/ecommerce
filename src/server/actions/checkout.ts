'use server';

import type { CartItem } from '~/store/cartStore';

export async function checkout(formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error('Invalid request');
  }
  const itemsString = formData.get('items') as string;

  const items = JSON.parse(itemsString) as CartItem[];

  console.log(items);
}
