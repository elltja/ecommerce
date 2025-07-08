import type { Prisma } from '@prisma/client';
import { EditOrderStatusAction } from './EditOrderStatusAction';
import { Button } from '@headlessui/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '~/i18n/navigation';

export function OrderTableRow({
  order,
}: {
  order: Prisma.OrderGetPayload<null>;
}) {
  return (
    <tr className='border-t border-gray-500/20'>
      <td className='px-4 py-3 font-semibold max-sm:hidden'>
        {order.customerEmail}
      </td>
      <td className='px-4 py-3 max-sm:hidden'>
        {order.createdAt.toDateString()}
      </td>
      <td className='px-4 py-3 max-sm:hidden'>
        <EditOrderStatusAction
          initialStatus={order.status}
          orderId={order.id}
        />
      </td>
      <td className='px-4 py-3 max-sm:hidden'>
        <Link href={`/seller/orders/${order.id}`} passHref>
          <Button className='flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-4 py-2 hover:bg-gray-200'>
            Show More <ArrowUpRight className='size-5' />
          </Button>
        </Link>
      </td>
    </tr>
  );
}
