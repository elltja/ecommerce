import { db } from '~/server/db';
import { DashboardCard } from './DashboardCard';
import { OrderStausIndicator } from '../OrderStatusIndicator';
import { List } from 'lucide-react';
import type { OrderStatus } from '@prisma/client';

export async function OrdersCard() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfToday.getDate() + 1);

  const [ordersCountsByStatus, totalCount] = await Promise.all([
    db.order.groupBy({
      by: ['status'],
      _count: { status: true },
      where: {
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    }),
    db.order.count({
      where: {
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    }),
  ]);

  const counts = Object.fromEntries(
    ordersCountsByStatus.map(({ status, _count }) => [status, _count.status]),
  ) as Record<OrderStatus, number>;

  return (
    <DashboardCard
      title={`${totalCount} orders toady`}
      link={{ href: '/seller/orders', text: 'View all orders' }}
      Icon={List}
    >
      <div className='flex gap-5'>
        <div className='flex items-center gap-1'>
          <span className='mr-1 font-semibold'>{counts.PLACED ?? 0}</span>
          <OrderStausIndicator status='PLACED' />
          placed
        </div>
        <div className='flex items-center gap-1'>
          <span className='mr-1 font-semibold'>{counts.SHIPPED ?? 0}</span>
          <OrderStausIndicator status='SHIPPED' />
          shipped
        </div>
        <div className='flex items-center gap-1'>
          <span className='mr-1 font-semibold'>{counts.COMPLETED ?? 0}</span>
          <OrderStausIndicator status='COMPLETED' />
          completed
        </div>
      </div>
    </DashboardCard>
  );
}
