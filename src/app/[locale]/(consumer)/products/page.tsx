import { ProductCard } from '~/components/ProductCard';
import { db } from '~/server/db';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className='flex w-full justify-center'>
      <div className=''>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

async function getProducts() {
  return db.product.findMany({
    include: { images: true },
  });
}
