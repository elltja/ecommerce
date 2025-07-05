'use server';

import { validateCartItems } from '~/lib/validators/cart';
import { stripe } from '../stripe';
import type Stripe from 'stripe';
import { env } from '~/env';
// eslint-disable-next-line no-restricted-imports
import { redirect } from 'next/navigation';
import { auth } from '../auth';
import {
  shipping_address_collection,
  shipping_options,
} from '../stripe/shipping';

export async function checkout(formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error('Invalid request');
  }
  const itemsString = formData.get('items');

  if (typeof itemsString !== 'string') {
    throw new Error('Invalid request data');
  }

  const rawItems = JSON.parse(itemsString) as unknown;

  const items = validateCartItems(rawItems);

  const line_items = items.map((item) => ({
    quantity: item.quantity,
    price_data: {
      unit_amount: item.product.priceInCents,
      currency: 'usd',
      product_data: {
        name: item.product.title,
        images: item.product.images.map((img) => img.url),
      },
    },
  })) satisfies Stripe.Checkout.SessionCreateParams.LineItem[];

  const userSession = await auth();

  const email = userSession?.user.email;

  const session = await stripe.checkout.sessions.create({
    shipping_options: shipping_options,
    shipping_address_collection: shipping_address_collection,
    payment_method_types: ['card'],
    line_items,
    billing_address_collection: 'required',
    mode: 'payment',
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/checkout`,
    ...(email ? { customer_email: email } : {}),
    metadata: {
      orderItems: JSON.stringify(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      ),
      customerId: userSession?.user.id ?? null,
    },
  });

  redirect(session.url!);
}
