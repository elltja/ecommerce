import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User, UserRole } from '@prisma/client';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

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
  providers: [GitHub],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      console.log('User in session callback: ', user);

      return {
        ...session,
        user: {
          ...session.user,
          role: (user as User).role,
          id: user.id,
        },
      };
    },
  },
} satisfies NextAuthConfig;
