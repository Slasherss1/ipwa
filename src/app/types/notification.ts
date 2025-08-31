export interface Notification {
  body: string
  title: string
  recp: {
    uid: string | null
    room: string | null
    type: 'all' | 'room' | 'uname'
  }
}
