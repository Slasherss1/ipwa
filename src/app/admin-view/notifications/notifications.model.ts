import { DateTime } from "luxon";

export type MessageAPI = Omit<Message, "sentDate"> & { sentDate: string }

export interface Message {
  _id: string;
  sentDate: DateTime;
  title: string;
  message?: string;
  rcpts?: MessageRecipients[]
}

export interface MessageRecipients {
  _id: string
  uname: string
  room?: string
  fname?: string
  surname?: string
}
