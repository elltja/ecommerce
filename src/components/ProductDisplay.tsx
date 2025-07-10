import type { Prisma } from '@prisma/client';
import { ProductImageDisplay } from './ProductImageDisplay';
import { ReviewStars } from './ReviewStars';
import { Separator } from './Separator';
import { AddToCartButton } from './AddToCartButton';
import { getAvrageRating } from '~/lib/utils/getAvrageRating';

export function ProductDisplay({
  product,
}: {
  product: Prisma.ProductGetPayload<{
    include: { images: true; reviews: true };
  }>;
}) {
  const rating = getAvrageRating(product.reviews);
  return (
    <div className='bg-bg grid grid-cols-1 py-10 md:grid-cols-2'>
      <ProductImageDisplay images={product?.images ?? []} />

      <div className='p-5'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-2xl font-bold'>{product?.title}</h1>
          <ReviewStars rating={rating} />
          <p className='lg:max-w-2/3'>{product?.description}</p>
          <span className='text-2xl font-bold'>
            ${product.priceInCents / 100}
          </span>
        </div>
        <div className='my-5 lg:my-7 lg:max-w-5/6'>
          <Separator />
        </div>

        <AddToCartButton productData={product} />
      </div>
    </div>
  );
}
