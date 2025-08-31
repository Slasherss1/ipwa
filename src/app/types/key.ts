import { DateTime } from 'luxon'
import { User } from './user'

export interface UKey {
  room: string
  taken: boolean
}

export type AKeyAPI = Omit<AKey, "borrow" | "tb"> & {borrow: string, tb?: string}

export interface AKey {
  room: string
  whom?: User
  borrow: DateTime
  tb?: DateTime
}
