'use server';

import { signIn } from '~/server/auth';
import type { OAuthProvider } from '~/server/auth/config';

export async function oAuthSignIn(provider: OAuthProvider) {
  await signIn(provider);
}

export type FormState = { error: string | null };

export async function emailSignIn(
  _: FormState,
  formData: unknown,
): Promise<FormState> {
  if (!(formData instanceof FormData)) {
    return { error: 'Invalid form data.' };
  }

  const email = formData.get('email');
  if (typeof email !== 'string' || !email.trim()) {
    return { error: 'Please provide a valid email address.' };
  }

  await signIn('resend', {
    email: email.trim(),
    callbackUrl: '/account/auth',
    redirect: false,
  });
  return { error: null };
}
