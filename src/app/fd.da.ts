import { Injectable } from '@angular/core'
import {
  DateFilterFn,
  DateRange,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker'
import { DateTime } from 'luxon'

@Injectable()
export class FDSelection implements MatDateRangeSelectionStrategy<DateTime> {
  selectionFinished(date: DateTime | null): DateRange<DateTime> {
    return this._cr(date)
  }
  createPreview(activeDate: DateTime | null): DateRange<DateTime> {
    return this._cr(activeDate)
  }

  private _cr(date: DateTime | null) {
    if (date) {
      const start = date.toUTC().startOf('week')
      const end = date.toUTC().set({ weekday: 5 }).endOf('day')
      return new DateRange<DateTime>(start, end)
    }
    return new DateRange<DateTime>(null, null)
  }
}

export const weekendFilter: DateFilterFn<DateTime | null> = (
  date: DateTime | null
): boolean => {
  const day = date?.weekday
  return day !== 6 && day !== 7
}
