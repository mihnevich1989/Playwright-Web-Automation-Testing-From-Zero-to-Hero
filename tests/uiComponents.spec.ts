import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard')

})

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input fields', async ({ page }) => {
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })

    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 200 })

    //generic assertion
    const inputvalue = await usingTheGridEmailInput.inputValue()
    expect(inputvalue).toEqual('test2@test.com')

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
  })

  test('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' })

    await usingTheGridForm.getByLabel('Option 1').check({ force: true })

    const radioStatus = usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()

    expect(radioStatus).toBeTruthy()

    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()

    await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })

    expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
    expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()
  })


})
