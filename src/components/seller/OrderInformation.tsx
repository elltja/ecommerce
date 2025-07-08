import type { Prisma } from '@prisma/client';
import type { z } from 'zod';
import type { shippingInformationSchema } from '~/lib/schemas/stripe';
import { EditOrderStatusAction } from './EditOrderStatusAction';
import {
  Notebook,
  ShoppingCart,
  Truck,
  User,
  type LucideIcon,
} from 'lucide-react';
import { Textarea } from '@headlessui/react';
import type { ReactNode } from 'react';

export function OrderInformation({
  order,
  shippingAddress,
}: {
  order: Prisma.OrderGetPayload<{
    include: { customer: true };
  }>;
  shippingAddress: z.infer<typeof shippingInformationSchema>;
}) {
  return (
    <div className='rounded bg-white p-5 shadow-sm'>
      <header className='flex justify-between'>
        <div>
          <h2 className='font-bold'>Order ID: {order.id}</h2>
          <p>{order.createdAt.toDateString()}</p>
        </div>
        <EditOrderStatusAction
          initialStatus={order.status}
          orderId={order.id}
        />
      </header>
      <div className='grid h-fit grid-cols-2 gap-15 p-10'>
        <DetailsCard title='Customer' Icon={User}>
          <ul>
            <li>
              <span className='text-gray-400'>Name: </span>
              <strong className='font-semibold'>
                {shippingAddress.name ?? order.customer?.name ?? 'Unknown'}
              </strong>
            </li>
            <li>
              <span className='text-gray-400'>Email: </span>
              <strong className='font-semibold'>{shippingAddress.email}</strong>
            </li>
            <li>
              <span className='text-gray-400'>Phone: </span>
              <strong className='font-semibold'>
                {shippingAddress.phone ?? <NotProvided />}
              </strong>
            </li>
          </ul>
        </DetailsCard>
        <DetailsCard title='Order Info' Icon={ShoppingCart}>
          <ul>
            <li>
              <span className='text-gray-400'>Total Amount: </span>
              <strong className='font-semibold'>
                ${order.totalAmountInCents / 100}
              </strong>
            </li>
            <li>
              <span className='text-gray-400'>Shipping Rate: </span>
              <strong className='font-semibold'>
                {shippingAddress.shippingRate.name}
              </strong>
            </li>

            <li>
              <span className='text-gray-400'>Status: </span>
              <strong className='font-semibold'>
                {order.status.toLowerCase()}
              </strong>
            </li>
          </ul>
        </DetailsCard>
        <DetailsCard title='Shipping Address' Icon={Truck}>
          <ul className='flex max-h-25 w-fit flex-col flex-wrap justify-start gap-x-7.5 gap-y-1'>
            <li className='w-fit'>
              <span className='text-gray-400'>Country: </span>
              <strong className='font-semibold'>
                {shippingAddress.address.country}
              </strong>
            </li>
            <li className='w-fit'>
              <span className='text-gray-400'>State: </span>
              <strong className='font-semibold'>
                {shippingAddress.address.state}
              </strong>
            </li>
            <li className='w-fit'>
              <span className='text-gray-400'>City: </span>
              <strong className='font-semibold'>
                {shippingAddress.address.city}
              </strong>
            </li>

            <li className='w-fit'>
              <span className='text-gray-400'>Line1: </span>
              <strong className='font-semibold'>
                {shippingAddress.address.line1}
              </strong>
            </li>
            <li className='w-fit'>
              <span className='text-gray-400'>Line2: </span>
              <strong className='font-semibold'>
                {shippingAddress.address.line2 ?? <NotProvided />}
              </strong>
            </li>
            <li className='w-fit'>
              <span className='text-gray-400'>Postal Code: </span>
              <strong className='font-semibold'>
                {shippingAddress.address.postalCode}
              </strong>
            </li>
          </ul>
        </DetailsCard>
        <DetailsCard title='Notes' Icon={Notebook}>
          <Textarea
            placeholder='Write your notes here..'
            className='my-2 h-25 w-9/12 resize-none rounded border border-gray-200 p-3 outline-none'
          ></Textarea>
        </DetailsCard>
      </div>
    </div>
  );
}

function DetailsCard({
  children,
  Icon,
  title,
}: {
  children: ReactNode;
  Icon: LucideIcon;
  title: string;
}) {
  return (
    <div className='flex size-full gap-4'>
      <div className='h-full py-2'>
        <div className='rounded-full bg-gray-200 p-4'>
          <Icon />
        </div>
      </div>
      <div className='flex w-full flex-col justify-start gap-1'>
        <div>
          <h3 className='text-lg font-bold'>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

const NotProvided = () => (
  <span className='font-normal text-gray-500'>Not provided</span>
);
