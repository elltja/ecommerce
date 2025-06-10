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
    EMAIL_SERVER_HOST:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    EMAIL_SERVER_PORT:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    EMAIL_SERVER_USER:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    EMAIL_SERVER_PASSWORD:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    EMAIL_FROM:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
  },

  client: {},

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
