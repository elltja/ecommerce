import { notFound } from 'next/navigation';
import { AddToCartButton } from '~/components/AddToCartButton';
import { ProductImageDisplay } from '~/components/ProductImageDisplay';
import { ReviewStars } from '~/components/ReviewStart';
import { Separator } from '~/components/Separator';
import { db } from '~/server/db';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (product == null) {
    return notFound();
  }

  return (
    <div className='my-10 grid grid-cols-1 md:grid-cols-2'>
      <ProductImageDisplay images={product?.images ?? []} />

      <div className='p-5'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-2xl font-bold'>{product?.title}</h1>
          <ReviewStars />
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

function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: 'asc' } } },
  });
}
