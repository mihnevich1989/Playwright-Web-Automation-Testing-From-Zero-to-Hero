import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard')
})

test('navigate to form page', async ({ page }) => {
  const navitgateTo = new NavigationPage(page)
  await navitgateTo.formLayotsPage()
})
