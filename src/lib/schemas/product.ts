import { z } from 'zod';

export const productSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdById: z.string(),
  description: z.string(),
  id: z.string(),
  priceInCents: z.number(),
  slug: z.string(),
  title: z.string(),
  images: z
    .array(
      z.object({
        altText: z.string().nullable(),
        id: z.string(),
        position: z.number(),
        url: z.string().url(),
      }),
    )
    .optional(),
});
