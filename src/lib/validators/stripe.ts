import type Stripe from 'stripe';
import { metadataSchema, ordersItemSchema } from '../schemas/stripe';

export function validateMetadata(rawMetadata: Stripe.Metadata | null) {
  const metadata = metadataSchema.parse(rawMetadata);

  const rawOrderItems = JSON.parse(metadata.orderItems) as unknown;
  const customerId = metadata.customerId;

  try {
    const orderItems = ordersItemSchema.parse(rawOrderItems);
    return { metadata: { customerId, orderItems }, success: true };
  } catch {
    return { success: false };
  }
}
