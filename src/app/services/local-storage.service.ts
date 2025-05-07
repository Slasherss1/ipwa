import { Injectable } from '@angular/core';
import { News } from '../types/news';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  permChecker(neededPermNumber: number) {
    return ((Number.parseInt(localStorage.getItem("admin")!) & neededPermNumber) == neededPermNumber)
  }

  logOut() {
    this.loggedIn = false
    this.admin = false
  }

  public hasRoom() {
    if (localStorage.getItem('room')) {
      return true
    } else {
      return false
    }
  }

  get room() {
    return localStorage.getItem('room')!
  }

  set room(value: string) {
    if (value == "") {
      localStorage.removeItem('room')
    } else {
      localStorage.setItem('room', value)
    }
  }

  get news(): News[] {
    return JSON.parse(localStorage.getItem('news')!)
  }

  set news(news: News[]) {
    localStorage.setItem('news', JSON.stringify(news))
  }

  get loggedIn() {
    if (localStorage.getItem("loggedIn")) {
      return true
    }
    return false
  }

  set loggedIn(is: boolean) {
    if (is) {
      localStorage.setItem("loggedIn", "true")
    } else {
      localStorage.removeItem("loggedIn")
    }
  }

  set admin(newInt: number | false) {
    if (newInt) {
      localStorage.setItem("admin", newInt.toString())
    } else {
      localStorage.removeItem('admin')
    }
  }

  get admin() {
    var lsa = localStorage.getItem("admin")
    return lsa ? Number.parseInt(lsa) : false
  }

  set amgreg(toggle: boolean) {
    if (toggle) {
      localStorage.setItem('amgrb', "true")
    } else {
      localStorage.removeItem('amgrb')
    }
  }

  get amgreg() {
    if (localStorage.getItem("amgrb") == "true") {
      return true
    }
    return false
  }

  set capFlag(n: number | null) {
    if (n) {
      localStorage.setItem('cap', n.toString())
    } else {
      localStorage.removeItem('cap')
    }
  }

  get capFlag() {
    var cap = localStorage.getItem('cap')
    if (cap) {
      return Number(cap)
    } else {
      return null
    }
  }

  public capCheck(perm: number) {
    return ((this.capFlag! & perm) == perm)
  }

  public get newsCheck(): { hash: string; count: number; } {
    let nc = localStorage.getItem("newsCheck")
    if (nc) {
      return JSON.parse(nc)
    } else {
      return {hash: "", count: 0}
    }
  }
  public set newsCheck(value: { hash: string; count: number; }) {
    localStorage.setItem("newsCheck", JSON.stringify(value))
  }

  public get defaultItems(): {sn: string[]; kol: string[];} {
    let di = localStorage.getItem('defaultItems')
    if (di) {
      return JSON.parse(di)
    } else {
      return {sn: [], kol: []}
    }
  }

  public set defaultItems(value: {sn: string[]; kol: string[];}) {
    localStorage.setItem('defaultItems', JSON.stringify(value))
  }

  public newsflag: number | false = false;

  public get vapid(): string {
    return localStorage.getItem('vapid')!
  }
  public set vapid(value: string) {
    localStorage.setItem("vapid", value)
  }
}
