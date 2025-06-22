import type { ProductImage } from '@prisma/client';

export type InitialData = {
  id: string;
  title: string;
  slug: string;
  priceInDollars: number;
  description: string;
  images: ProductImage[];
};

export type FormFields = {
  title: string;
  slug: string;
  priceInDollars: number;
  description: string;
  images: File[];
};

export type FormErrors = Partial<Record<keyof FormFields, string>>;
