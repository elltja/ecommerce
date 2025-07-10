'use client';

import { Button } from '@headlessui/react';
import { useReducer } from 'react';
import { ReviewComposer } from './ReviewComposer';

export function ReviewsHeader({ productId }: { productId: string }) {
  const [writingMode, toggleWritingMode] = useReducer((s) => !s, false);

  return (
    <>
      <div className='mt-10 flex w-full items-end gap-2'>
        <h2 className='text-2xl font-semibold'>Reviews</h2>
        <Button
          className='size-fit cursor-pointer underline'
          onClick={toggleWritingMode}
        >
          write a review
        </Button>
      </div>
      {writingMode && <ReviewComposer productId={productId} />}
    </>
  );
}
