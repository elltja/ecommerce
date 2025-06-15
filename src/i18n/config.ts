import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es', 'sv'] as const;
export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
});
