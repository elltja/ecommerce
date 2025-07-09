import { db } from '~/server/db';
import { TableSkeleton } from '../TableSkeleton';
import { Suspense } from 'react';
import Image from 'next/image';
import { Link } from '~/i18n/navigation';

export function MostOrderedProducts() {
  return (
    <div className='flex h-fit w-full flex-col gap-5 rounded bg-white p-7 shadow'>
      <table className='w-full table-fixed overflow-hidden'>
        <thead className='text-left text-sm text-gray-900'>
          <tr>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              <h2 className='mb-5 text-lg font-semibold'>
                Most Ordered Products
              </h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={<TableSkeleton />}>
            <SuspendedProducts />
          </Suspense>
        </tbody>
      </table>
      <Link
        href='/seller/products'
        className='mx-4 text-blue-400 hover:underline'
      >
        View all products
      </Link>
    </div>
  );
}

async function SuspendedProducts() {
  const products = await getProducts();
  return products.map((product, idx) => (
    <tr className='border-t border-gray-500/20' key={product.id}>
      <td className='px-4 py-3 max-sm:hidden'>
        <div className='flex gap-3'>
          <div className='flex items-center text-gray-500'>{idx + 1}</div>
          <Image
            src={product.images[0]?.url ?? '/test-images/2.webp'}
            alt=''
            width={50}
            height={50}
            className='aspect-square'
          />
          <div>
            <h3 className='font-semibold'>{product.title}</h3>
            <p className='text-sm text-gray-500' data-testid='product-slug'>
              {product.slug}
            </p>
          </div>
        </div>
      </td>
    </tr>
  ));
}

function getProducts() {
  return db.product.findMany({
    orderBy: { orderItems: { _count: 'desc' } },
    include: { images: true },
    take: 3,
  });
}
