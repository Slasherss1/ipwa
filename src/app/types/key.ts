import { DateTime } from 'luxon'

export interface UKey {
  room: string
  taken: boolean
}

export type AKeyAPI = Omit<AKey, "borrow" | "tb"> & {borrow: string, tb?: string}

export interface AKey {
  room: string
  whom?: { _id: string; uname: string; room: string }
  borrow: DateTime
  tb?: DateTime
}
