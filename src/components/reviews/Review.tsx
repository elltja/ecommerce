import type { Prisma, Review } from '@prisma/client';
import { ReviewStars } from './ReviewStars';

import { DeleteReviewButton } from '../DeleteReviewButton';

export function Review({
  data,
  canDeleteReview,
}: {
  data: Prisma.ReviewGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
  canDeleteReview: boolean;
}) {
  return (
    <li className='flex w-96 max-w-screen flex-col gap-1 rounded bg-white p-3 shadow'>
      <div className='flex items-center justify-between'>
        <ReviewStars rating={data.rating} />
        {canDeleteReview && <DeleteReviewButton reviewId={data.id} />}
      </div>
      <span className='font-semibold'>
        {data.user.name ?? 'Unknown'} | {data.createdAt.toDateString()}
      </span>
      <p>{data.text}</p>
    </li>
  );
}
