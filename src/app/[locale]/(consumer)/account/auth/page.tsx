import { Button } from '@headlessui/react';
import Image from 'next/image';
import { oAuthSignIn } from '~/server/actions/auth';
import { EmailAuthForm } from '~/components/EmailAuthForm';
import { Separator } from '~/components/Separator';
import { useTranslations } from 'next-intl';

export default function AuthPage() {
  const t = useTranslations('authPage');
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div>
        <h1 className='text-title mx-auto my-5 text-center text-2xl font-medium'>
          {t('title')}
        </h1>
        <div className='flex w-96 flex-col gap-3'>
          <OAuthButton provider='github' />
          <OAuthButton provider='google' />
          <Separator text='or' />
          <EmailAuthForm />
        </div>
      </div>
    </div>
  );
}

function OAuthButton({ provider }: { provider: 'github' | 'google' }) {
  const t = useTranslations('authPage');
  return (
    <Button
      onClick={oAuthSignIn.bind(null, provider)}
      className='flex cursor-pointer items-center gap-3 rounded border border-gray-200 p-3'
    >
      <Image
        src={`/logos/${provider}.png`}
        alt={provider}
        width={25}
        height={25}
      />
      {t('continueWithProvider', { provider })}
    </Button>
  );
}
