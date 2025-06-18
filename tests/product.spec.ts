import test from '@playwright/test';
import { cleanUpTestUser, createAdminSession } from './helpers/auth';
import { cleanUpTestProduct, getUniqueSlug } from './helpers/product';

const LOCALE = 'en';

test.describe('create product', () => {
  let userId: string;
  let slug: string;

  test.beforeEach(async ({ context }) => {
    const user = await createAdminSession(context);
    userId = user.id;
    slug = await getUniqueSlug('test-slug');
  });

  test('can create product', async ({ page }) => {
    await page.goto('/seller/products/new');
    await page.fill('input[name="title"]', 'Test Title');
    await page.fill('input[name="slug"]', slug);
    await page.fill('input[name="priceInDollars"]', '10');
    await page.fill(
      'textarea[name="description"]',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ullam adipisci numquam suscipit ratione.',
    );
    await Promise.all([
      page.waitForURL(`/${LOCALE}/seller/products`),
      page.click('button[type="submit"]'),
    ]);
  });

  test.afterEach(async () => {
    await cleanUpTestProduct(slug);
    if (userId) await cleanUpTestUser(userId);
  });
});
