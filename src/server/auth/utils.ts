import { auth } from '.';
import { db } from '../db';

export async function getCurrentUser() {
  const session = await auth();
  if (session == null) return null;
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  return user;
}
