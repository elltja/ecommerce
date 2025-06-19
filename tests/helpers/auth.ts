import type { BrowserContext } from '@playwright/test';
import type { UserRole } from '@prisma/client';
import { db } from '~/server/db';

export async function createSession(
  context: BrowserContext,
  role: UserRole = 'USER',
) {
  const email = `test-${crypto.randomUUID()}@example.com`;
  const user = await db.user.create({
    data: {
      email,
      name: `Test user ${crypto.randomUUID()}`,
      role,
    },
  });

  const sessionToken = crypto.randomUUID();

  await db.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expires: new Date(Date.now() + 30 * 86400 * 1000),
    },
  });

  await context.addCookies([
    {
      name: 'authjs.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);
  return user;
}

export async function cleanUpTestUser(userId: string) {
  await db.session.deleteMany({ where: { userId } });
  await db.user.delete({ where: { id: userId } });
}
