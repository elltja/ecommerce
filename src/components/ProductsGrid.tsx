import { db } from '~/server/db';
import { ProductCard } from './ProductCard';

export async function ProductsGrid({
  exclude,
  limit,
}: {
  exclude?: string[];
  limit?: number;
}) {
  const products = await getProducts({ exclude, limit });

  return (
    <div className='auto-grid grid w-fit max-w-screen gap-10'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
async function getProducts({
  exclude,
  limit,
}: {
  exclude?: string[];
  limit?: number;
}) {
  return db.product.findMany({
    include: { images: true },
    orderBy: { createdAt: 'asc' },
    where: {
      id: { notIn: exclude },
    },
    take: limit,
  });
}
