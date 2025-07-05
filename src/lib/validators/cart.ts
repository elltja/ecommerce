import { z } from 'zod';

const cartItemSchema = z.object({
  product: z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    createdById: z.string(),
    description: z.string(),
    id: z.string(),
    priceInCents: z.number(),
    slug: z.string(),
    title: z.string(),
    images: z.array(
      z.object({
        altText: z.string().optional(),
        id: z.string(),
        position: z.number(),
        url: z.string().url(),
      }),
    ),
  }),
  quantity: z.number(),
});

export const cartSchema = z.array(cartItemSchema);

export type CartItem = z.infer<typeof cartItemSchema>;

export function validateCartItems(items: unknown) {
  return cartSchema.parse(items);
}
