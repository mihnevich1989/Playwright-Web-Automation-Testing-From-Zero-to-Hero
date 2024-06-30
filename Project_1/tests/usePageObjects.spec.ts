import { test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard')
})

test('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayotsPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toastrPage()
  await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayotsPage()
  await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
  await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('John Wick', 'test@test.com', true)
  await pm.navigateTo().datepickerPage()
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10)
})
