import { notFound } from 'next/navigation';
import { ProductDisplay } from '~/components/ProductDisplay';

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

  return <ProductDisplay product={product} />;
}

function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: 'asc' }, omit: { productId: true } },
    },
  });
}
