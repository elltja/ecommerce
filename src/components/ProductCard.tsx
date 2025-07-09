import { Button } from '@headlessui/react';
import type { Prisma } from '@prisma/client';
import Image from 'next/image';
import { Link } from '~/i18n/navigation';
import { ReviewStars } from './ReviewStart';

export function ProductCard({
  product,
}: {
  product: Prisma.ProductGetPayload<{
    include: { images: true };
  }>;
}) {
  const image = product.images[0];
  const priceInDollars = (product.priceInCents / 100).toFixed(2);

  return (
    <Link href={`/products/${product.slug}`} passHref>
      <article className='flex w-fit gap-2 bg-white p-10 shadow'>
        <div className='aspect-square w-fit'>
          <ProductImage
            url={image?.url ?? ''}
            altText={image?.altText ?? product.title}
          />
        </div>
        <div className='flex w-fit flex-col gap-2'>
          <h2 className='text-xl font-bold'>{product.title}</h2>
          <ReviewStars />
          <p className='line-clamp-4 max-w-96 text-gray-500'>
            {product.description}
          </p>
          <span className='text-lg font-bold'>{priceInDollars}</span>
          <Button className='bg-primary hover:bg-primary-hover text-bg my-5 cursor-pointer rounded-full px-4 py-2'>
            Add to cart
          </Button>
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
