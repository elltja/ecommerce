import type { UserRole } from '@prisma/client';

export function canCreateProduct({ role }: { role?: UserRole }) {
  return role === 'ADMIN';
}

export function canUpdateProduct({ role }: { role?: UserRole }) {
  return role === 'ADMIN';
}
