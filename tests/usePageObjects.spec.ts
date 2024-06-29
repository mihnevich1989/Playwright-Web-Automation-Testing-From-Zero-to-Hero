import { test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard')
})

test('navigate to form page', async ({ page }) => {
  const navigateTo = new NavigationPage(page)
  await navigateTo.formLayotsPage()
  await navigateTo.datepickerPage()
  await navigateTo.smartTablePage()
  await navigateTo.toastrPage()
  await navigateTo.tooltipPage()
})

test('parametrized methods', async ({ page }) => {
  const navigateTo = new NavigationPage(page)
  const onFormLayoutsPage = new FormLayoutPage(page)

  await navigateTo.formLayotsPage()
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Wick', 'test@test.com', true)
})

