'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import type { OrderStatus } from '@prisma/client';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { editOrderStatus } from '~/server/actions/order';
import { OrderStausIndicator } from './OrderStatusIndicator';

export function EditOrderStatusAction({
  initialStatus,
  orderId,
}: {
  initialStatus: OrderStatus;
  orderId: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(status: OrderStatus) {
    try {
      await editOrderStatus(orderId, status);
      setStatus(status);
    } catch {
      setError('Failed to update order status. Please try again.');
    }
  }

  return (
    <Listbox onChange={handleChange}>
      <ListboxButton className='group flex cursor-pointer items-center gap-1 p-1 outline-none'>
        <span className='flex items-center gap-2 group-hover:text-black'>
          <OrderStausIndicator status={status} />
          {status.toLowerCase()}
        </span>
        <Pen className='size-4 text-gray-500 group-hover:text-black' />
        {error && (
          <p
            className='mx-2 text-sm text-red-600'
            role='alert'
            aria-live='assertive'
          >
            {error}
          </p>
        )}
      </ListboxButton>
      <ListboxOptions
        anchor='bottom'
        className='overflow-hidden rounded-xs border-none bg-white shadow-lg outline-none'
      >
        <ListboxOption
          value='PLACED'
          className='cursor-pointer p-2 hover:bg-gray-300'
        >
          Placed
        </ListboxOption>
        <ListboxOption
          value='SHIPPED'
          className='cursor-pointer p-2 hover:bg-gray-300'
        >
          Shipped
        </ListboxOption>
        <ListboxOption
          value='COMPLETED'
          className='cursor-pointer p-2 hover:bg-gray-300'
        >
          Completed
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  );
}
