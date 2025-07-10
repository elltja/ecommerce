import type { Review, UserRole } from '@prisma/client';

export function canCreateReview({ role }: { role: UserRole }) {
  return role === 'USER' || role === 'ADMIN';
}

export function canDeleteReview(
  user: { role: UserRole; id: string } | undefined,
  review: Review,
) {
  return user?.id === review.userId || user?.role === 'ADMIN';
}
