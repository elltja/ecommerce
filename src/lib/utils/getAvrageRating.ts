import type { Review } from '@prisma/client';

export function getAvrageRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  return total / reviews.length;
}
