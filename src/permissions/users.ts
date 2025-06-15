import type { UserRole } from '@prisma/client';

export function canUpdateUserRole({ role }: { role?: UserRole | null }) {
  return role === 'ADMIN';
}
