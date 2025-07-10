'use client';

import { Trash2Icon } from 'lucide-react';
import { LoadingTextSwap } from '../LoadingTextSwap';
import { useTransition } from 'react';
import { deleteReview } from '~/server/actions/review';
import { useRouter } from '~/i18n/navigation';

export function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <LoadingTextSwap isLoading={isPending}>
      <Trash2Icon
        className='size-5 cursor-pointer text-red-500'
        onClick={() => {
          startTransition(async () => {
            await deleteReview(reviewId);
          });
          router.refresh();
        }}
      />
    </LoadingTextSwap>
  );
}
