import type { Prisma } from '@prisma/client';
import Image from 'next/image';
import { Link } from '~/i18n/navigation';
import { ReviewStars } from '../reviews/ReviewStars';
import { getAvrageRating } from '~/lib/utils/getAvrageRating';

export function ProductCard({
  product,
}: {
  product: Prisma.ProductGetPayload<{
    include: { images: true; reviews: true };
  }>;
}) {
  const image = product.images[0];
  const priceInDollars = (product.priceInCents / 100).toFixed(2);
  const rating = getAvrageRating(product.reviews);

  return (
    <Link href={`/products/${product.slug}`} passHref className='w-fit'>
      <article className='flex w-96 max-w-screen flex-col rounded bg-white p-3 shadow'>
        <div>
          <ProductImage
            url={image?.url ?? ''}
            altText={image?.altText ?? product.title}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <ReviewStars rating={rating} />
          <h3>{product.title}</h3>
          <p className='line-clamp-2 text-sm text-gray-500'>
            {product.description}
          </p>
          <span className='text-lg font-bold'>${priceInDollars}</span>
        </div>
      </article>
    </Link>
  );
}

function ProductImage({ url, altText }: { url: string; altText: string }) {
  return (
    <Image
      src={url}
      alt={altText}
      width={300}
      height={300}
      className='aspect-square h-80 object-cover'
    />
  );
}
