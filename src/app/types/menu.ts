import { DateTime } from 'luxon'

export type MenuAPI = Omit<Menu, "day"> & {day: string}

export interface Menu {
  _id: string
  day: DateTime
  sn: {
    fancy: string[]
    second: string
  }
  ob: {
    soup: string
    vege: string
    meal: string
    condiments: string[]
    drink: string
    other: string[]
  }
  kol?: string
  kolv?: '+' | '-' | 'n'
  obv?: '+' | '-' | 'n'
  stat?: { kol?: string; ob?: string }
  dayTitle?: string
}
