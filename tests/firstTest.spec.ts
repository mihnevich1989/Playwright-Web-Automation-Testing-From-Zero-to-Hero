import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard')
})

test.describe('suite 1', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
  })

  test('navigate to form layout page', async ({ page }) => {
    await page.getByText('Form Layouts').click()
  })

  test('navigate to datepicker page', async ({ page }) => {
    await page.getByText('Datepicker').click()
  })
})

test.describe('suite 2', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByText('Charts', {exact: true}).click()
  })

  test('navigate to Echarts page', async ({ page }) => {
    await page.getByText('Echarts').click()
  })
})

