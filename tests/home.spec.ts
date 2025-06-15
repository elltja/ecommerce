import { test, expect } from '@playwright/test';

test.describe('landing page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Ecom/);
  });
});
