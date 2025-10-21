import { effect, Injectable, signal } from '@angular/core'
import { News } from '../types/news.model'
import { User } from '../types/user'
import { Capabilities } from '../types/capability'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get user() {
    return JSON.parse(localStorage.getItem('user')!) ?? undefined
  }

  set user(value: User | undefined) {
    if (!value) {
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user', JSON.stringify(value))
    }
  }

  permChecker(perm: string) {
    return this.admin?.includes(perm) ?? false
  }

  logOut() {
    localStorage.clear()
  }

  public hasRoom() {
    if (this.room) {
      return true
    } else {
      return false
    }
  }

  get room(): string | undefined {
    return this.user?.room
  }

  get loggedIn() {
    if (localStorage.getItem('loggedIn')) {
      return true
    }
    return
  }

  set loggedIn(is: true | undefined) {
    if (is) {
      localStorage.setItem('loggedIn', 'true')
    } else {
      localStorage.removeItem('loggedIn')
    }
  }

  set admin(perms: string[] | undefined) {
    if (perms) {
      localStorage.setItem('admin', JSON.stringify(perms))
    } else {
      localStorage.removeItem('admin')
    }
  }

  get admin() {
    const lsa = localStorage.getItem('admin')
    return lsa ? JSON.parse(lsa) : undefined
  }

  get isAdmin(): boolean {
    return this.admin ? true : false
  }

  set capFlag(n: Capabilities) {
    if (n) {
      localStorage.setItem('cap', JSON.stringify(n))
    } else {
      localStorage.removeItem('cap')
    }
  }

  get capFlag() {
    const capItem = localStorage.getItem('cap')
    if (capItem) {
      const cap = JSON.parse(capItem)
      if (typeof cap == "object") {
        return cap
      } else {
        localStorage.removeItem('cap')
      }
    }
    return {
      clean: false,
      groups: false,
      key: false,
      menu: false,
      news: false,
      notif: false
    }
  }

  public capCheck(perm: keyof Capabilities) {
    return perm in this.capFlag ? this.capFlag[perm] : false
  }

  public get defaultItems(): { sn: string[]; kol: string[] } {
    const di = localStorage.getItem('defaultItems')
    if (di) {
      return JSON.parse(di)
    } else {
      return { sn: [], kol: [] }
    }
  }

  public set defaultItems(value: { sn: string[]; kol: string[] }) {
    localStorage.setItem('defaultItems', JSON.stringify(value))
  }

  public get newsDate(): Date {
    return new Date(localStorage.getItem("newsDate")!)
  }

  public set newsDate(value: string) {
    localStorage.setItem("newsDate", value)
  }

  public newsFlag = signal<number | null>(this._getNewsFlag())
  private syncNewsFlag = effect(() => this._setNewsFlag)

  private _getNewsFlag(): number | null {
    const item = localStorage.getItem("newsFlag")
    if (item) {
      return Number(item)
    } else {
      return null
    }
  }

  private _setNewsFlag(value: number | null) {
    if (value) {
      localStorage.setItem("newsFlag", value.toString())
    } else {
      localStorage.removeItem("newsFlag")
    }
  }

  public get vapid(): string {
    return localStorage.getItem('vapid')!
  }
  public set vapid(value: string) {
    localStorage.setItem('vapid', value)
  }
}
