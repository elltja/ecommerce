import type { NextRequest } from 'next/server';
import type Stripe from 'stripe';
import { env } from '~/env';
import { shippingInformationSchema } from '~/lib/schemas/stripe';
import { validateMetadata } from '~/lib/validators/stripe';
import { db } from '~/server/db';
import { stripe } from '~/server/stripe';
import { getShippingRate } from '~/server/stripe/utils';

export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature')!;
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      try {
        await processStripeCheckout(session);
        return new Response(null, { status: 200 });
      } catch (error) {
        console.error(`Webhook for event ${event.type} failed: `, error);

        return new Response(null, { status: 500 });
      }
    default:
      return new Response('Event type not handled', { status: 200 });
  }
}

async function processStripeCheckout(checkoutSession: Stripe.Checkout.Session) {
  const { metadata, success } = validateMetadata(checkoutSession.metadata);

  if (!success || metadata == null) {
    console.error('Invalid metadata');
    throw new Error('Invalid metadata');
  }

  const shippingRate = await getShippingRate(checkoutSession);

  const customerDetails = checkoutSession.customer_details;

  const shippingInformation = shippingInformationSchema.parse({
    name: customerDetails?.name,
    phone: customerDetails?.phone,
    email: customerDetails?.email,
    shippingRate: {
      name: shippingRate.display_name,
      amount: shippingRate.fixed_amount?.amount,
    },
    address: {
      line1: customerDetails?.address?.line1,
      line2: customerDetails?.address?.line2,
      city: customerDetails?.address?.city,
      state: customerDetails?.address?.state,
      postalCode: customerDetails?.address?.postal_code,
      country: customerDetails?.address?.country,
    },
  });

  const paymentIntentId = checkoutSession.payment_intent;

  if (typeof paymentIntentId !== 'string') {
    throw new Error('Missing or invalid paymentIntentId');
  }
  if (typeof checkoutSession.amount_total !== 'number') {
    throw new Error('Missing total amount');
  }

  try {
    await db.order.create({
      data: {
        customerEmail: shippingInformation.email,
        paymentIntentId: paymentIntentId,
        customerId: metadata.customerId,
        totalAmountInCents: checkoutSession.amount_total,
        shippingAddress: shippingInformation,
        items: {
          createMany: {
            data: metadata.orderItems,
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to create order: ', error);

    throw error;
  }
}
