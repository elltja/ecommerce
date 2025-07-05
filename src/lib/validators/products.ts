import { z } from 'zod';

export const productInputDataSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  slug: z
    .string({ required_error: 'Slug is required' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Invalid slug format' }),
  priceInDollars: z
    .string({ required_error: 'Price is required' })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'Price must be a valid number',
    }),
  description: z.string({ required_error: 'Description is required' }),
});

type Errors = {
  title?: string;
  slug?: string;
  priceInDollars?: string;
  description?: string;
};

export function validateProductData(
  fields: Partial<z.input<typeof productInputDataSchema>>,
) {
  const { success, data, error } = productInputDataSchema.safeParse(fields);

  if (!success) {
    const errors: Errors = {};
    const formattedError = error.format();

    errors.title = formattedError.title?._errors[0];
    errors.slug = formattedError.slug?._errors[0];
    errors.priceInDollars = formattedError.priceInDollars?._errors[0];
    errors.description = formattedError.description?._errors[0];
    return { success: false, errors };
  }

  return { success: true, data };
}
