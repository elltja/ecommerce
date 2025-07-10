'use client';

import { useState, useTransition } from 'react';
import { ReviewStars } from './ReviewStars';
import { Button, Textarea } from '@headlessui/react';
import { LoadingTextSwap } from '../LoadingTextSwap';
import Form from 'next/form';
import { createReview } from '~/server/actions/review';
import { useRouter } from '~/i18n/navigation';

export function ReviewComposer({ productId }: { productId: string }) {
  const [rating, setRating] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function handleSubmit(formData: FormData) {
    const text = formData.get('text') as string;
    startTransition(async () => {
      try {
        await createReview(productId, { text, rating });
        router.refresh();
      } catch {
        setError('Failed to create review');
      }
    });
  }
  return (
    <Form
      action={handleSubmit}
      className='w-[600px] rounded bg-white p-3 px-5 shadow'
    >
      <ReviewStars rating={rating} onStarClick={(idx) => setRating(idx)} />
      <div className='flex items-center gap-4'>
        <div className='w-9/12'>
          <Textarea
            name='text'
            placeholder='Write your review here..'
            className='my-2 field-sizing-content max-h-25 w-full resize-none rounded border border-gray-200 p-3 outline-none'
          ></Textarea>
          {error && <p className='text-red-500'>{error}</p>}
        </div>

        <Button
          type='submit'
          className='bg-primary hover:bg-primary-hover my-2 h-[45px] cursor-pointer rounded-full px-6 font-semibold text-white'
        >
          <LoadingTextSwap isLoading={isPending}>Submit</LoadingTextSwap>
        </Button>
      </div>
    </Form>
  );
}
