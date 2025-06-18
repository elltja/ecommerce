export type InitialData = {
  id: string;
  title: string;
  slug: string;
  priceInDollars: number;
  description: string;
};

export type FormFields = {
  title: string;
  slug: string;
  priceInDollars: number;
  description: string;
  images: File[];
};

export type FormErrors = Partial<Record<keyof FormFields, string>>;
