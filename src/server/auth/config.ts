import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User, UserRole } from '@prisma/client';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import { env } from '~/env';

import { db } from '~/server/db';

export type OAuthProvider = 'github' | 'google';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }
}

export const authConfig = {
  providers: [
    GitHub,
    Resend({
      apiKey: env.AUTH_RESEND_KEY,
      from: env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        role: (user as User).role,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
