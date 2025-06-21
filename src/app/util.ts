import { DateFilterFn } from "@angular/material/datepicker"
import { DateTime } from "luxon"

export const weekendFilter: DateFilterFn<DateTime | null> = (
  date: DateTime | null
): boolean => {
  const day = date?.weekday
  return day !== 6 && day !== 7
}

export function filterLook(filter: DateFilterFn<DateTime | null>, ab: "ahead" | "behind" = "ahead", date: DateTime = DateTime.now(), maxSearchDays = 365): DateTime | null {
  let currentDate = date
  switch (ab) {
    case "ahead":
      for (let i = 0; i < maxSearchDays; i++) {
        if (filter(currentDate)) return currentDate
        currentDate = currentDate.plus({day: 1})
      }
      return null;
    case "behind":
      for (let i = 0; i < maxSearchDays; i++) {
        if (filter(currentDate)) return currentDate
        currentDate = currentDate.minus({day: 1})
      }
      return null;
    default:
      return null;
  }
}
