import test, { expect } from '@playwright/test';
import { cleanUpTestUser, createSession } from './helpers/auth';
import {
  cleanUpTestProduct,
  createTestProduct,
  fillProductForm,
  getUniqueSlug,
} from './helpers/product';
import type { Product } from '@prisma/client';

const LOCALE = 'en';

test.describe('Product creation', () => {
  let userId: string;
  let globalSlug: string;

  test.beforeEach(async ({ context }) => {
    const user = await createSession(context, 'ADMIN');
    userId = user.id;
    globalSlug = await getUniqueSlug('test-slug');
  });

  test('can create product with valid data', async ({ page }) => {
    await page.goto('/seller/products/new');

    const slug = globalSlug;
    const title = `Test-product-${Date.now()}`;

    await fillProductForm(page, {
      title,
      slug,
      price: '10',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    });
    await page.click('button[type="submit"]');
    await page.waitForURL(`/${LOCALE}/seller/products`);

    await expect(page.getByText(title)).toBeVisible();
  });

  test('should display errors when submitted with invalid data', async ({
    page,
  }) => {
    await page.goto('/seller/products/new');

    await page.click('button[type="submit"]');

    await expect(page.getByText(/title is required/i)).toBeVisible();
    await expect(page.getByText(/slug is required/i)).toBeVisible();
    await expect(page.getByText(/price is required/i)).toBeVisible();
    await expect(page.getByText(/description is required/i)).toBeVisible();
  });

  test.afterEach(async () => {
    await cleanUpTestProduct(globalSlug);
    if (userId) await cleanUpTestUser(userId);
  });
});

test.describe('Product deletion', () => {
  let userId: string;
  let slug: string;
  let product: Product;

  test.beforeEach(async ({ context }) => {
    const user = await createSession(context, 'ADMIN');
    userId = user.id;

    const title = `Test-product-${Date.now()}`;
    slug = await getUniqueSlug('test-slug');

    product = await createTestProduct({
      title,
      slug,
      priceInCents: 10,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      createdById: userId,
    });
  });

  test('can delete product', async ({ page }) => {
    await page.goto('/seller/products');

    const productTableRow = page.getByTestId(`product-table-row-${product.id}`);

    const deleteButton = productTableRow
      .getByRole('button')
      .filter({ hasText: 'Delete' });

    await deleteButton.click();

    await productTableRow.waitFor({ state: 'detached', timeout: 5000 });
    await expect(productTableRow).not.toBeVisible();
  });

  test.afterEach(async () => {
    await cleanUpTestProduct(product.slug);
    if (userId) await cleanUpTestUser(userId);
  });
});
