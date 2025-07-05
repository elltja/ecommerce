import type Stripe from 'stripe';
import { stripe } from './index';

export function getShippingRate(checkoutSession: Stripe.Checkout.Session) {
  const shippingRateId = checkoutSession.shipping_cost?.shipping_rate;

  if (typeof shippingRateId !== 'string') {
    throw new Error('Invalid shipping rate id');
  }
  return stripe.shippingRates.retrieve(shippingRateId);
}
