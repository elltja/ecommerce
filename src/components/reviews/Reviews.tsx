import type { Prisma } from '@prisma/client';
import { Review } from './Review';
import { ReviewsHeader } from './ReviewsHeader';
import { auth } from '~/server/auth';
import { canDeleteReview } from '~/permissions/review';

export async function Reviews({
  reviews,
  productId,
}: {
  reviews: Prisma.ReviewGetPayload<{
    include: { user: { select: { name: true } } };
  }>[];
  productId: string;
}) {
  const session = await auth();

  return (
    <div className='w-full'>
      <div className='mx-auto flex w-fit flex-col gap-10 md:mx-48'>
        <ReviewsHeader productId={productId} />
        <ul className='auto-grid grid w-fit max-w-screen gap-10'>
          {reviews.map((review) => (
            <Review
              key={review.id}
              data={review}
              canDeleteReview={canDeleteReview(session?.user, review)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
