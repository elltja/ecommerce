import { Benefits } from '~/components/Benefits';
import { Features } from '~/components/Features';

import { Hero } from '~/components/Hero';
import { ProductDisplay } from '~/components/ProductDisplay';
import { env } from '~/env';
import { db } from '~/server/db';

export default async function HomePage() {
  const product = await getProduct();

  return (
    <div className='w-full max-w-screen overflow-x-hidden'>
      <Hero />
      {product && <ProductDisplay product={product} />}
      <Features />
      <Benefits />
    </div>
  );
}

function getProduct() {
  return db.product.findUnique({
    where: { slug: env.NEXT_PUBLIC_MAIN_PRODUCT_SLUG },
    include: { images: { orderBy: { position: 'asc' } }, reviews: true },
  });
}
