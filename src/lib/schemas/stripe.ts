import z from 'zod';

export const metadataSchema = z.object({
  orderItems: z.string(),
  customerId: z.string().optional(),
});

export const shippingInformationSchema = z.object({
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string(),
  shippingRate: z.object({
    name: z.string(),
    amount: z.number(),
  }),

  address: z.object({
    line1: z.string(),
    line2: z.string().nullable().optional(),
    city: z.string(),
    state: z.string().nullable().optional(),
    postalCode: z.string(),
    country: z.string(),
  }),
});

const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const ordersItemSchema = z.array(orderItemSchema);
