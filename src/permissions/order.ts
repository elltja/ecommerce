import type { UserRole } from '@prisma/client';

export function canEditOrderStatus({ role }: { role: UserRole }) {
  return role === 'ADMIN';
}
