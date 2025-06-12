import { Resend } from 'resend';
import { env } from '~/env';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationMail({
  to,
  url,
}: {
  to: string;
  url: string;
}) {
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject: 'Verify your email',
    text: `Click this link to verify your email: ${url}`,
  });
}
