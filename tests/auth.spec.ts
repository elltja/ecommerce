import test, { expect } from '@playwright/test';
import {
  cleanUpTestUser,
  createAdminSession,
  createSession,
} from './helpers/auth';

const LOCALE = 'en';

test.describe('unauthenticated user', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });
  test('can access auth page', async ({ page }) => {
    await page.goto('/account/auth');
    await expect(
      page.getByRole('heading', { level: 1, name: /Sign In/i }),
    ).toBeVisible();
  });
  test('should be redirected to home page when trying to access seller page', async ({
    page,
  }) => {
    await page.goto('/seller');
    await expect(page).toHaveURL(`${LOCALE}`);
  });
});

test.describe('authenticated user', () => {
  let userId: string;

  test.beforeEach(async ({ context }) => {
    const user = await createSession(context);
    userId = user.id;
  });
  test('should be redirected to home page when trying to access seller page', async ({
    page,
  }) => {
    await page.goto('/seller');
    await expect(page).toHaveURL(`${LOCALE}`);
  });
  test.afterEach(async () => {
    if (userId) await cleanUpTestUser(userId);
  });
});

test.describe('authenticated admin user', () => {
  let userId: string;

  test.beforeEach(async ({ context }) => {
    const user = await createAdminSession(context);
    userId = user.id;
  });
  test('can access seller page', async ({ page }) => {
    await page.goto('/seller');
    await expect(page).toHaveURL(`${LOCALE}/seller`);
  });
  test.afterEach(async () => {
    if (userId) await cleanUpTestUser(userId);
  });
});
