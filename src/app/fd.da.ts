import { Injectable } from "@angular/core";
import { DateRange, MatDateRangeSelectionStrategy } from "@angular/material/datepicker";
import * as moment from "moment";

@Injectable()
export class FDSelection implements MatDateRangeSelectionStrategy<moment.Moment> {
    selectionFinished(date: moment.Moment | null): DateRange<moment.Moment> {
        return this._cr(date)
    }
    createPreview(activeDate: moment.Moment | null): DateRange<moment.Moment> {
        return this._cr(activeDate)
    }

    private _cr(date: moment.Moment | null) {
        if (date) {
            const start = moment(date).startOf('week')
            const end = moment(date).isoWeekday(5).endOf('day')
            return new DateRange<moment.Moment>(start, end)
        }
        return new DateRange<moment.Moment>(null, null)
    }
    
}

export const weekendFilter = (date: moment.Moment | null): boolean => {
    const day = date?.isoWeekday()
    return day !== 6 && day !== 7
  }