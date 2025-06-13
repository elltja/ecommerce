import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User, UserRole } from '@prisma/client';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import { env } from '~/env';
import { db } from '~/server/db';
import { sendVerificationMail } from '~/services/resend/resend';

export type OAuthProvider = 'github';

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
      async sendVerificationRequest({ url, identifier }) {
        if (env.SKIP_EMAIL_VERIFICATION) {
          console.log('Verification URL:', url);
          return;
        }
        await sendVerificationMail({ url, to: identifier });
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  secret: env.AUTH_GITHUB_ID,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub!,
        role: token.role,
      },
    }),
    jwt: ({ token, user }) => {
      if (user && 'role' in user) {
        token.role = (user as User).role;
      }
      return token;
    },
  },
  events: {
    async createUser({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { role: 'USER' },
      });
    },
  },
} satisfies NextAuthConfig;
