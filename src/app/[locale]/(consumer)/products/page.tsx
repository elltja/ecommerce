import { ProductsGrid } from '~/components/products/ProductsGrid';

export default async function ProductsPage() {
  return (
    <div className='flex h-screen w-full justify-center px-5 py-10 md:justify-start'>
      <ProductsGrid />
    </div>
  );
}
