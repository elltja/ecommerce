'use client';

import { CheckCircle2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useCartStore } from '~/store/cartStore';

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const t = useTranslations('orderSuccess');

  return (
    <div className='flex h-screen w-full justify-center py-50'>
      <div className='flex w-fit flex-col items-center'>
        <CheckCircle2Icon className='size-25 text-lime-400' strokeWidth={1} />
        <h1 className='max-w-screen text-center text-xl leading-10 font-medium md:max-w-96'>
          {t('title')}
        </h1>
        <p className='max-w-screen text-center md:max-w-96'>
          {t('description')}
        </p>
      </div>
    </div>
  );
}
