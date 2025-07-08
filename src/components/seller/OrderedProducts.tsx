import type { Prisma } from '@prisma/client';
import Image from 'next/image';

export function OrderedProducts({
  orderItems,
}: {
  orderItems: Prisma.OrderItemGetPayload<{
    include: { product: { include: { images: true } } };
  }>[];
}) {
  return (
    <div className='rounded bg-white p-5 shadow-sm'>
      <h2 className='font-bold'>Products</h2>
      <table className='w-full table-fixed overflow-hidden'>
        <thead className='text-left text-sm text-gray-900'>
          <tr>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Product
            </th>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Product Price
            </th>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Quantity
            </th>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <TableRow item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({
  item,
}: {
  item: Prisma.OrderItemGetPayload<{
    include: { product: { include: { images: true } } };
  }>;
}) {
  return (
    <tr className='border-t border-gray-500/20'>
      <td className='px-4 py-3 max-sm:hidden'>
        <div className='flex gap-3'>
          <Image
            src={item.product.images[0]?.url ?? '/test-images/2.webp'}
            alt=''
            width={50}
            height={50}
            className='aspect-square'
          />
          <div>
            <h3 className='font-semibold'>{item.product.title}</h3>
            <p className='text-sm text-gray-500' data-testid='product-slug'>
              {item.product.slug}
            </p>
          </div>
        </div>
      </td>
      <td className='px-4 py-3 max-sm:hidden'>
        {(item.product.priceInCents / 100).toFixed(2)}
      </td>
      <td className='px-4 py-3 max-sm:hidden'>{item.quantity}</td>
      <td className='px-4 py-3 max-sm:hidden'>
        {((item.product.priceInCents / 100) * item.quantity).toFixed(2)}
      </td>
    </tr>
  );
}
