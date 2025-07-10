import { notFound } from 'next/navigation';
import { OrderedProducts } from '~/components/seller/orders/OrderedProducts';
import { OrderInformation } from '~/components/seller/orders/OrderInformation';
import { shippingInformationSchema } from '~/lib/schemas/stripe';
import { db } from '~/server/db';

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await getOrder(orderId);

  if (!order) notFound();

  const shippingAddress = shippingInformationSchema.parse(
    order.shippingAddress,
  );

  return (
    <div className='flex flex-col gap-10'>
      <OrderInformation order={order} shippingAddress={shippingAddress} />
      <OrderedProducts orderItems={order.items} />
    </div>
  );
}

function getOrder(id: string) {
  return db.order.findUnique({
    where: { id },
    include: {
      customer: true,
      items: { include: { product: { include: { images: true } } } },
    },
  });
}
