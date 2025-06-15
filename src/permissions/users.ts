import type { UserRole } from '@prisma/client';

export function canUpdateUserRole({ role }: { role?: UserRole }) {
  return role === 'ADMIN';
}

export function canAccessUserList({ role }: { role?: UserRole }) {
  return role === 'ADMIN';
}
