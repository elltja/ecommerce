import { notFound } from 'next/navigation';
import { ProductDisplay } from '~/components/ProductDisplay';
import { ProductsGrid } from '~/components/ProductsGrid';

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
    <>
      <ProductDisplay product={product} />
      <FeaturedProducts exclude={product.id} />
    </>
  );
}

function FeaturedProducts({ exclude }: { exclude: string }) {
  return (
    <div className='w-full'>
      <div className='mx-auto w-fit md:mx-48'>
        <div className='w-full'>
          <h2 className='my-10 text-2xl font-semibold'>Featured Products</h2>
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
    },
  });
}
