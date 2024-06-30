import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/')
})

test('has logo', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});
