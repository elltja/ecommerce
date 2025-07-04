import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    AUTH_RESEND_KEY: z.string(),
    EMAIL_FROM: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_BASE_URL: z.string(),
    NEXT_PUBLIC_MAIN_PRODUCT_SLUG: z.string(),
  },

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_MAIN_PRODUCT_SLUG: process.env.NEXT_PUBLIC_MAIN_PRODUCT_SLUG,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
