import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Menu } from '../types/menu';
import { environment } from 'src/environments/environment';
import { News } from '../types/news';
import moment from 'moment';
import { map } from 'rxjs';
import { UKey } from '../types/key';
import { CleanNote } from '../types/clean-note';
import { Status } from '../types/status';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  constructor(private http:HttpClient) { }

  getNews() {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.get<News[]>(environment.apiEndpoint+"/app/news", {headers: headers, withCredentials: true})
  }

  newsCheck() {
    return this.http.get<{ hash: string; count: number; }>(environment.apiEndpoint+`/app/news/check`, {withCredentials: true})
  }

  getMenu(dom: moment.Moment) {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.get<Menu>(environment.apiEndpoint+`/app/menu/${dom.valueOf()}`, {headers: headers, withCredentials: true})
  }

  postVote(date: moment.Moment, type: "ob" | "kol", vote: "-" | "+" | "n") {
    return this.http.post(environment.apiEndpoint+`/app/menu/${date.valueOf()}`, {
      doc: moment().toISOString(true),
      tom: type,
      vote: vote
    }, {withCredentials: true})
  }

  postNotif(nd: object) {
    const headers = {
      'Content-Type': 'application/json',
    }
    this.http.post(environment.apiEndpoint+`/notif`, nd, {headers: headers, withCredentials: true}).subscribe()
  }

  getKeys() {
    return this.http.get<UKey[]>(environment.apiEndpoint+`/app/keys`, {withCredentials: true})
  }

  getClean(date: moment.Moment) {
    return this.http.get<{grade: number, notes: CleanNote[], tips: string}>(environment.apiEndpoint+`/app/clean/${date.toISOString()}`, {withCredentials: true})
  }

  getNotifCheck() {
    return this.http.get<{_id: string, message: {title: string, body: string}, sentDate: moment.Moment}[]>(environment.apiEndpoint+`/app/notif/check`, {withCredentials: true})
  }

  postInfoAck(id: string) {
    return this.http.post<Status>(environment.apiEndpoint+`/app/notif/${id}/ack`, undefined, {withCredentials: true})
  }
}
