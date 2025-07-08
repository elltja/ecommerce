'use server';

import type { OrderStatus } from '@prisma/client';
import { auth } from '../auth';
import { canEditOrderStatus } from '~/permissions/order';
import { db } from '../db';
import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';

export async function editOrderStatus(orderId: string, status: OrderStatus) {
  const session = await auth();

  if (!session || !canEditOrderStatus(session.user)) {
    throw new Error('You do not have permission to edit order status');
  }

  const updatedOrder = await db.order.update({
    where: { id: orderId },
    data: { status },
  });

  const locale = await getLocale();
  revalidatePath(`/${locale}/seller/orders/${orderId}`);

  return updatedOrder;
}
