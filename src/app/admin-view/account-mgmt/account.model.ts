import { DateTime } from 'luxon'

export interface User {
  _id: string
  uname: string
  room?: string
  admin?: number
  locked?: boolean
  fname?: string
  surname?: string
  groups: string[]
  regDate: DateTime
  defaultPage?: string
}

export type UserAPI = Omit<User, "regDate"> & {regDate: "string"}
