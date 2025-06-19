import type { Page } from '@playwright/test';
import { randomUUID } from 'crypto';
import { db } from '~/server/db';

export async function cleanUpTestProduct(slug: string) {
  await db.product.deleteMany({ where: { slug } });
}

export async function getUniqueSlug(name: string): Promise<string> {
  return `${name}-${Date.now()}-${randomUUID()}`;
}

export async function fillProductForm(
  page: Page,
  {
    title,
    slug,
    price,
    description,
  }: { title: string; slug: string; price: string; description: string },
) {
  await page.fill('input[name="title"]', title);
  await page.fill('input[name="slug"]', slug);
  await page.fill('input[name="priceInDollars"]', price);
  await page.fill('textarea[name="description"]', description);
}

export async function createTestProduct(data: {
  title: string;
  description: string;
  priceInCents: number;
  slug: string;
  createdById: string;
}) {
  return db.product.create({
    data,
  });
}
