import type { UserRole } from '@prisma/client';

export function canAccessSellerPages({ role }: { role: UserRole | null }) {
  return role === 'ADMIN';
}
