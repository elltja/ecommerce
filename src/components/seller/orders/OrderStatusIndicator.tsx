import type { OrderStatus } from '@prisma/client';

export function OrderStausIndicator({ status }: { status: OrderStatus }) {
  const color =
    status === 'COMPLETED'
      ? 'bg-green-300'
      : status === 'SHIPPED'
        ? 'bg-yellow-300'
        : 'bg-gray-300';
  return <div className={`${color} size-3 rounded-full`} />;
}
