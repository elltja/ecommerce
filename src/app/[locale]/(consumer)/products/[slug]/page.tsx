import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { ProductDisplay } from '~/components/products/ProductDisplay';
import { ProductsGrid } from '~/components/products/ProductsGrid';
import { Reviews } from '~/components/reviews/Reviews';

import { db } from '~/server/db';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (product == null) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-10'>
      <ProductDisplay product={product} />
      <FeaturedProducts exclude={product.id} />
      <Reviews productId={product.id} reviews={product.reviews} />
    </div>
  );
}

function FeaturedProducts({ exclude }: { exclude: string }) {
  const t = useTranslations('product');
  return (
    <div className='w-full'>
      <div className='mx-auto w-fit md:mx-48'>
        <div className='w-full'>
          <h2 className='my-10 text-2xl font-semibold'>
            {t('featuredProducts')}
          </h2>
        </div>

        <ProductsGrid exclude={[exclude]} limit={4} />
      </div>
    </div>
  );
}

function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: 'asc' }, omit: { productId: true } },
      reviews: { include: { user: { select: { name: true } } } },
    },
  });
}
