import type { z } from 'zod';
import { type cartItemSchema, cartSchema } from '../schemas/cart';

export type CartItem = z.infer<typeof cartItemSchema>;

export function validateCartItems(items: unknown) {
  const result = cartSchema.safeParse(items);
  if (!result.success) {
    throw new Error('Invalid cart items');
  }
  return result.data;
}
