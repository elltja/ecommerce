'use server';

import type { UserRole } from '@prisma/client';
import { db } from '../db';
import { auth } from '../auth';
import { canUpdateUserRole } from '~/permissions/users';

export async function updateUserRole(userId: string, role: UserRole) {
  const session = await auth();
  if (!canUpdateUserRole({ role: session?.user.role })) {
    throw new Error('You do not have permission to update user roles.');
  }
  if (session?.user.id === userId) {
    throw new Error('You cannot edit your own role');
  }
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { role },
    select: { role: true },
  });
  return updatedUser;
}
