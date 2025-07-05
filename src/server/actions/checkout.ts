'use server';

import { validateCartItems } from '~/lib/validators/cart';

export async function checkout(formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error('Invalid request');
  }
  const itemsString = formData.get('items');

  if (typeof itemsString !== 'string') {
    throw new Error('Invalid request data');
  }

  const rawItems = JSON.parse(itemsString) as unknown;

  const items = validateCartItems(rawItems);
}
