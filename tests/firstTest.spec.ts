import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page})=>{
  //by Tag
  await page.locator('input').first().click()

  //by ID
  await page.locator('#inputEmail1').click()

  //by Class
  page.locator('.shape-rectangle')

  //by attribute
  page.locator('[placeholder="Email1"]')

  //by class value full
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //by combine different selectors
  page.locator('input[placeholder="Email"][nbinput]')

  //by xPath (not recommended)
  page.locator('//*[@id="inputEmail1"]')

  //by partial text match
  page.locator(':text("Using")')

  //by exact text match
  page.locator(':text-is("Using the Grid")')
})
