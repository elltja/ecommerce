import type { UserRole } from '@prisma/client';

export function canAccessSellerPages({ role }: { role?: UserRole }) {
  return role === 'ADMIN';
}

export function canAccessAdminPages({ role }: { role?: UserRole }) {
  return role === 'ADMIN';
}
