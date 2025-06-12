import { PrismaAdapter } from '@auth/prisma-adapter';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import { env } from '~/env';
import { db } from '~/server/db';
import { sendVerificationMail } from '~/services/resend/resend';

export type OAuthProvider = 'github' | 'google';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authConfig = {
  providers: [
    GitHub,
    Resend({
      from: 'onboarding@resend.dev',
      apiKey: env.RESEND_API_KEY,
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
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
