import { Suspense } from 'react';
import { OrderTableRow } from '~/components/seller/OrderTableRow';
import { TableSkeleton } from '~/components/seller/TableSkeleton';
import { db } from '~/server/db';

export default function OrdersPage() {
  return (
    <table className='w-full table-fixed overflow-hidden'>
      <thead className='text-left text-sm text-gray-900'>
        <tr>
          <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
            Customer Email
          </th>
          <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
            Order Date
          </th>
          <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
            Status
          </th>
          <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <Suspense fallback={<TableSkeleton />}>
          <SuspendedOrders />
        </Suspense>
      </tbody>
    </table>
  );
}

async function SuspendedOrders() {
  const orders = await db.order.findMany();
  return orders.map((order) => <OrderTableRow key={order.id} order={order} />);
}
