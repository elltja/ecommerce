import { Button } from '@headlessui/react';
import { Suspense } from 'react';
import { PageHeader } from '~/components/seller/PageHeader';
import { ProductTableRow } from '~/components/seller/ProductTableRow';
import { TableSkeleton } from '~/components/seller/TableSkeleton';
import { Link } from '~/i18n/navigation';
import { db } from '~/server/db';

export default function ProductsPage() {
  return (
    <>
      <PageHeader title='All Products'>
        <Link href='/seller/products/new' passHref>
          <Button className='bg-primary hover:bg-primary-hover text-bg cursor-pointer rounded-full px-8 py-2'>
            Add Product
          </Button>
        </Link>
      </PageHeader>
      <table className='w-full table-fixed overflow-hidden'>
        <thead className='text-left text-sm text-gray-900'>
          <tr>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Product
            </th>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Price
            </th>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={<TableSkeleton />}>
            <SuspendedProducts />
          </Suspense>
        </tbody>
      </table>
    </>
  );
}

async function SuspendedProducts() {
  const products = await getProducts();

  return products.map((product) => (
    <ProductTableRow key={product.id} product={product} />
  ));
}

function getProducts() {
  return db.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      priceInCents: true,
      slug: true,
      images: { orderBy: { position: 'asc' } },
    },
  });
}
