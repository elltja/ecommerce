import { Benefits } from '~/components/sections/Benefits';
import { Features } from '~/components/sections/Features';

import { Hero } from '~/components/sections/Hero';
import { ProductDisplay } from '~/components/products/ProductDisplay';
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
