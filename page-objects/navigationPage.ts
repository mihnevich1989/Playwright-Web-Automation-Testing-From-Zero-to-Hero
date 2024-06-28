import { Page } from '@playwright/test'

export class NavigationPage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async formLayotsPage() {
    await this.selectGroupMenuItem('Forms')
    await this.page.getByText('Form Layouts').click()
  }

  async datepickerPage() {
    await this.selectGroupMenuItem('Forms')
    await this.page.waitForTimeout(1000)
    await this.page.getByText('Datepicker').click()
  }

  async smartTablePage() {
    await this.selectGroupMenuItem('Tables & Data').click()
    await this.page.getByText('Smart Table').click()
  }

  async toastrPage() {
    await this.selectGroupMenuItem('Modal & Overlays').click()
    await this.page.getByText('Toastr').click()
  }

  async tooltipPage() {
    await this.selectGroupMenuItem('Modal & Overlays').click()
    await this.page.getByText('Tooltip').click()
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expendedState = await groupMenuItem.getAttribute('aria-expanded')
    if (expendedState == 'false') {
      await groupMenuItem.click()
    }
  }
}


