import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatepickerPage extends HelperBase {

  constructor(page: Page) {
    super(page)
  }

  /**
   * pick date in calendar and check it in filled field
   * @param numberOfDaysFromToday choose a number how many days you want to add to today and start from this date (today + numberOfDays)
   */
  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputfield = this.page.getByPlaceholder('Form Picker')
    await calendarInputfield.click()
    const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
    await expect(calendarInputfield).toHaveValue(dateToAssert)
  }

  /**
   * pick range between two dates in calendar and check it in filled field
   * @param startDateFromToday start date from today
   * @param endDateFromToday end  date from today
   */
  async selectDatepickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number) {
    const calendarInputfield = this.page.getByPlaceholder('Range Picker')
    await calendarInputfield.click()

    const dateToAssertStart = await this.selectDateInTheCalendar(startDateFromToday)
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDateFromToday)
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
    await expect(calendarInputfield).toHaveValue(dateToAssert)
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date()
    date.setDate(date.getDate() + numberOfDaysFromToday)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    }

    await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, { exact: true }).click()
    return dateToAssert
  }
}
