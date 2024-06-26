import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
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

test('User facing locators', async ({ page }) => {

  await page.getByRole('textbox', { name: "Email" })
    .first()
    .click()
  await page.getByRole('button', { name: "sign in" })
    .first()
    .click()

  await page.getByLabel('Email')
    .first()
    .click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTestId('SignIn').click()

  await page.getByTitle('Modal & Overlays').click()
})

test('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card nb-radio :text-is("Option 2")').check()

  await page.locator('nb-card')
    .locator('nb-radio')
    .locator(':text-is("Option 2")')
    .click()

  await page.locator('nb-card')
    .getByRole('button', { name: 'Sign In' })
    .first()
    .click()

  await page.locator('nb-card')
    .nth(3)
    .getByRole('button')
    .click()
})

test('locating parent elements', async ({ page }) => {

  await page.locator('nb-card', { hasText: 'Using the Grid' })
    .getByRole('textbox', { name: "Email" })
    .click()
  await page.locator('nb-card', { has: page.locator('#inputEmail1') })
    .getByRole('textbox', { name: "Email" })
    .click()

  await page.locator('nb-card')
    .filter({ hasText: 'Basic form' })
    .getByRole('textbox', { name: "Email" })
    .click()
  await page.locator('nb-card')
    .filter({ has: page.locator('.status-danger') })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page.locator('nb-card')
    .filter({ has: page.locator('nb-checkbox') })
    .filter({ hasText: 'Sign in' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page.locator(':text-is("Using the Grid")')
    .locator('..')
    .getByRole('textbox', { name: 'Email' })
    .click()
})

test('reusing the locators', async ({ page }) => {

  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  const emailField = basicForm.getByRole('textbox', { name: "Email" })

  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', { name: "Password" }).fill('123456')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('extract values', async ({ page }) => {

  //single test value
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  const emailField = basicForm.getByRole('textbox', { name: "Email" })

  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  //all text values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain('Option 1')

  //input value
  await emailField.fill('test@example.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@example.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({ page }) => {

  const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')
  
  //general assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  //locator assertion
  await expect(basicFormButton).toHaveText('Submit')

  //soft assertion
  await expect.soft(basicFormButton).toHaveText('Submit')
  await basicFormButton.click()
})

