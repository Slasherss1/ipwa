import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../types/menu';
import { Status } from '../types/status';
import { Group } from '../types/group';
import { map } from 'rxjs';
import { Notification } from '../types/notification';
import { News } from '../types/news';
import { AKey } from '../types/key';
import { IUSettings } from './settings/settings.component';
import User from '../types/user';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class AdminCommService {

  constructor(private http: HttpClient) { }

  //#region Menu
  menu = {
    getMenu: (start?: DateTime | null, end?: DateTime | null) => {
      if (start && end) {
        const body = {start: start.toString(), end: end.toString()}
        return this.http.get<(Omit<Menu, "day"> & {day: string})[]>(environment.apiEndpoint+"/admin/menu", {withCredentials: true, params: body})
      }
      return
    },

    getOpts: () => {
      return this.http.get<any>(environment.apiEndpoint+`/admin/menu/opts`, {withCredentials: true})
    },

    postMenu: (file: File) => {
      if (file) {
        const formData = new FormData();
        formData.append("menu", file)
        return this.http.post<Status>(environment.apiEndpoint+"/admin/menu/upload", formData, {withCredentials: true})
      }
      return
    },

    editSn: (id: string, content: Menu['sn']) => {
      return this.putMenu(id, {sn: content})
    },

    editOb: (id: string, content: Menu['ob']) => {
      return this.putMenu(id, {ob: content})
    },

    editKol: (id: string, content: Menu['kol']) => {
      return this.putMenu(id, {kol: content})
    },

    editTitle: (id: string, content: Menu['dayTitle']) => {
      return this.putMenu(id, {dayTitle: content})
    },

    print: (start?: DateTime | null, end?: DateTime | null) => {
      if (start && end) {
        const body = {start: start.toString(), end: end.toString()}
        return this.http.get(environment.apiEndpoint+"/admin/menu/print", {withCredentials: true, params: body, responseType: "text"})
      }
      return
    },

    stat: (day: DateTime, m: "ob" | "kol") => {
      return this.http.get<{y: number, n: number}>(environment.apiEndpoint+`/admin/menu/${day.toISO()}/votes/${m}`, {withCredentials: true})
    },
    new: {
      single: (day: DateTime) => {
        return this.http.post<Status>(environment.apiEndpoint+`/admin/menu/${day.toISO()}`, null, {withCredentials: true})
      },
      range: (start: DateTime, count: number) => {
        return this.http.post<Status>(environment.apiEndpoint+`/admin/menu/${start.toISO()}/${count}/`, null, {withCredentials: true})
      }
    },
    rm: (id: string) => {
      return this.http.delete<Status>(environment.apiEndpoint+`/admin/menu/${id}`, {withCredentials: true})
    }
  }
  
  private putMenu(id: string, update: Partial<Menu>) {
    return this.http.put<Status>(environment.apiEndpoint+`/admin/menu/${id}`, update, {withCredentials: true})
  }
  //#endregion
  //#region News
  news = {
    getNews: () => {
      return this.http.get<News[]>(environment.apiEndpoint+`/admin/news`, {withCredentials: true})
    },

    postNews: (title: string, content: string) => {
      return this.http.post<any>(environment.apiEndpoint+`/admin/news`, {title: title, content: content}, {withCredentials: true})
    },

    deleteNews: (id: string) => {
      return this.http.delete<any>(environment.apiEndpoint+`/admin/news/${id}`, {withCredentials: true})
    },

    toggleNews: (id: string, inverter: boolean) => {
      return this.putNews(id,{visible: !inverter})
    },

    togglePin: (id: string, inverter: boolean) => {
      return this.putNews(id,{pinned: !inverter})
    },

    updateNews: (id: string, title: string, content: string) => {
      return this.putNews(id,{title: title, content: content, date: Date.now})
    }
  }

  private putNews(id: string, update: object) {
    return this.http.put<any>(environment.apiEndpoint+`/admin/news/${id}`, update, {withCredentials: true})
  }
  //#endregion
  //#region amgmt
  accs = {
    getAccs: () => {
      return this.http.get<{
        users: Omit<User, "pass">[],
        groups: Group[]
      }>(environment.apiEndpoint+`/admin/accs`, {withCredentials: true})
    },

    postAcc: (item: any) => {
      return this.http.post<Status>(environment.apiEndpoint+`/admin/accs`, item, {withCredentials: true})
    },

    putAcc: (id: string, update: Partial<User>) => {
      return this.http.put<Status>(environment.apiEndpoint+`/admin/accs/${id}`, update, {withCredentials: true})
    },

    resetPass: (id: string) => {
      return this.http.patch<Status>(environment.apiEndpoint+`/admin/accs/${id}/reset`, {}, {withCredentials: true})
    },
    
    deleteAcc: (id: string) => {
      return this.http.delete<Status>(environment.apiEndpoint+`/admin/accs/${id}`, {withCredentials: true})
    },

    getUser: (id: string) => {
      return this.http.get<Omit<User, "pass" | "regDate"> & {lockout: boolean, regDate: string}>(environment.apiEndpoint+`/admin/accs/${id}`, {withCredentials: true})
    },

    clearLockout: (id: string) => {
      return this.http.delete<Status>(environment.apiEndpoint+`/admin/accs/${id}/lockout`, {withCredentials: true})
    }
  }
  //#endregion
  //#region Groups
  groups = {
    getGroups: () => {
      return this.http.get<Group[]>(environment.apiEndpoint+`/admin/groups`, {withCredentials: true})
    },

    newGroup: (name: string) => {
      return this.http.post<Status>(environment.apiEndpoint+`/admin/groups`, {name: name}, {withCredentials: true}) 
    },
    
    editName: (id: string, name: string) => {
      return this.putGroups(id, {name: name.trim()})
    },

    remove: (id: string) => {
      return this.http.delete<Status>(environment.apiEndpoint+`/admin/groups/${id}`, {withCredentials: true})
    }
  }

  private putGroups(id: string, update: Partial<Group>) {
    return this.http.put<Status>(environment.apiEndpoint+`/admin/groups/${id}`, update, {withCredentials: true})
  }
  //#endregion
  //#region Notif
  notif = {
    send: (n: Notification) => {
      return this.http.post<{sent: number, possible: number}>(environment.apiEndpoint+"/admin/notif/send", n, {withCredentials: true})   
    },
    getGroups: () => {
      return this.http.get<Group[]>(environment.apiEndpoint+"/admin/notif/groups", {withCredentials: true})
    },
    outbox: {
      getSent: () => {
        return this.http.get<{_id: string, sentDate: string, title: string}[]>(environment.apiEndpoint+"/admin/notif/outbox", {withCredentials: true}).pipe(map(v => v.map(i => ({
          ...i, 
          sentDate: DateTime.fromISO(i.sentDate)
        }))))
      },
      getBody: (id: string) => {
        return this.http.get(environment.apiEndpoint+`/admin/notif/outbox/${id}/message`, {withCredentials: true, responseType: "text"})
      },
      getRcpts: (id: string) => {
        return this.http.get<{_id: string, uname: string, room?: string, fname?: string, surname?: string}[]>(environment.apiEndpoint+`/admin/notif/outbox/${id}/rcpts`, {withCredentials: true})
      }
    }
  }
  //#endregion
  //#region Keys
  keys = {
    getKeys: () => {
      return this.http.get<(Omit<AKey, "borrow" | "tb"> & {borrow: string, tb?: string})[]>(environment.apiEndpoint+`/admin/keys`, {withCredentials: true}).pipe(map((v) => {
        return v.map((r) => {
          let newkey: any = {...r}
          newkey.borrow = DateTime.fromISO(r.borrow!)
          if (newkey.tb) newkey.tb = DateTime.fromISO(r.tb!)
          return newkey as AKey
        })
      }))
    },

    avalKeys: () => {
      return this.http.get<string[]>(environment.apiEndpoint+`/admin/keys/available`, {withCredentials: true})
    },

    postKey: (room: string, uname: string) => {
      return this.http.post<Status>(environment.apiEndpoint+`/admin/keys/`, {room: room, whom: uname}, {withCredentials: true})
    },

    returnKey: (id: string) => {
      return this.putKeys(id, {tb: DateTime.now()})
    }
  }

  private putKeys(id: string, update: Partial<AKey>) {
    return this.http.put<Status>(environment.apiEndpoint+`/admin/keys/${id}`, update, {withCredentials: true})
  }
  //#endregion
  //#region Clean
  clean = {
    getConfig: () => {
      return this.http.get<{rooms: string[], things: string[]}>(environment.apiEndpoint+`/admin/clean/config`, {withCredentials: true})
    },
    getClean: (date: string, room: string) => {
      return this.http.get<{_id: string, date: string, grade: number, gradeDate: string, notes: {label: string, weight: number}[], room: string, tips: string} | null>(environment.apiEndpoint+`/admin/clean/${date}/${room}`, {withCredentials: true})
    },
    postClean: (obj: Object) => {
      return this.http.post<Status>(environment.apiEndpoint+`/admin/clean/`, obj, {withCredentials: true})
    },
    delete: (id: string) => {
      return this.http.delete<Status>(environment.apiEndpoint+`/admin/clean/${id}`, {withCredentials: true})
    },
    summary: {
      getSummary: (start: DateTime, end: DateTime) => {
        return this.http.get<{room: string, avg: number}[]>(environment.apiEndpoint+`/admin/clean/summary/${start.toISO()}/${end.toISO()}`, {withCredentials: true})
      }
    },
    attendence: {
      getUsers: (room: string) => {
        return this.http.get<{users: {fname: string, surname: string, _id: string}[], attendence?: {auto: {id: string, hour?: string}[], notes: string}}>(environment.apiEndpoint+`/admin/clean/attendence/${room}`, {withCredentials: true})
      },
      postAttendence: (room: string, attendence: {auto: {id: string, hour?: string}[], notes: string}) => {
        return this.http.post<Status>(environment.apiEndpoint+`/admin/clean/attendence/${room}`, attendence, {withCredentials: true})
      },
      getSummary: () => {
        return this.http.get<{room: string, hours: string[], notes: string, auto: boolean}[]>(environment.apiEndpoint+`/admin/clean/attendenceSummary`, {withCredentials: true})
      },
      deleteRoom: (room: string) => {
        return this.http.delete<Status>(environment.apiEndpoint+`/admin/clean/attendence/${room}`, {withCredentials: true})
      }
    }
  }
  //#endregion
  //#region Settings
  settings = {
    getAll: () => {
      return this.http.get<IUSettings>(environment.apiEndpoint+`/admin/settings/`, {withCredentials: true})
    },
    post: (settings: IUSettings) => {
      return this.http.post<Status>(environment.apiEndpoint+`/admin/settings/`, settings, {withCredentials: true})
    },
    reload: () => {
      return this.http.get<Status>(environment.apiEndpoint+`/admin/settings/reload/`, {withCredentials: true})
    }
  }
  //#endregion

  //#region misc
  userFilter = (query: string) => {
    return this.http.get<any[]>(environment.apiEndpoint+`/admin/usearch`, {params: {q: query}, withCredentials: true})
  }
  //#endregion
}
