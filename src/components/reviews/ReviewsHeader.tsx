'use client';

import { Button } from '@headlessui/react';
import { useReducer } from 'react';
import { ReviewComposer } from './ReviewComposer';
import { useTranslations } from 'next-intl';

export function ReviewsHeader({ productId }: { productId: string }) {
  const [writingMode, toggleWritingMode] = useReducer((s) => !s, false);

  const t = useTranslations('product');

  return (
    <>
      <div className='mt-10 flex w-full items-end gap-2'>
        <h2 className='text-2xl font-semibold'>{t('reviews')}</h2>
        <Button
          className='size-fit cursor-pointer underline'
          onClick={toggleWritingMode}
        >
          {t('writeAReview')}
        </Button>
      </div>
      {writingMode && <ReviewComposer productId={productId} />}
    </>
  );
}
