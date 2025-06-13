export interface News {
  _id: string
  title: string
  content: string
  date: string
  visible?: boolean
  pinned?: boolean,
  author: {
    fname?: string,
    surname?: string,
    uname: string
  }
}
