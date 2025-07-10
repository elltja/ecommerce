import { z } from 'zod';

export const reviewSchema = z.object({
  text: z.string(),
  rating: z.number().min(1).max(5),
  userId: z.string(),
  productId: z.string(),
});
