import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Menu } from '../types/menu'
import { environment } from 'src/environments/environment'
import { News } from '../types/news.model'
import { UKey } from '../types/key'
import { CleanNote } from '../types/clean-note'
import { Status } from '../types/status'
import { DateTime } from 'luxon'

@Injectable({
  providedIn: 'root',
})
export class UpdatesService {
  private http = inject(HttpClient)

  getNews() {
    return this.http.get<News[]>(environment.apiEndpoint + '/app/news', { withCredentials: true })
  }

  newsCheck() {
    return this.http.get<{ hash: string; count: number }>(
      environment.apiEndpoint + `/app/news/check`,
      { withCredentials: true }
    )
  }

  getMenu(dom: DateTime) {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.get<Menu>(environment.apiEndpoint + `/app/menu/${dom.toISODate()}`, {
      headers: headers,
      withCredentials: true,
    })
  }

  postVote(date: string, type: 'ob' | 'kol', vote: '-' | '+' | 'n') {
    return this.http.post(
      environment.apiEndpoint + `/app/menu/${date}`,
      {
        doc: DateTime.now(),
        tom: type,
        vote: vote,
      },
      { withCredentials: true }
    )
  }

  postNotif(nd: object) {
    const headers = {
      'Content-Type': 'application/json',
    }
    this.http
      .post(environment.apiEndpoint + `/notif`, nd, {
        headers: headers,
        withCredentials: true,
      })
      .subscribe()
  }

  getKeys() {
    return this.http.get<UKey[]>(environment.apiEndpoint + `/app/keys`, {
      withCredentials: true,
    })
  }

  getClean(date: DateTime) {
    return this.http.get<{ grade: number; notes: CleanNote[]; tips: string }>(
      environment.apiEndpoint + `/app/clean/${date.toISODate()}`,
      { withCredentials: true }
    )
  }

  getNotifCheck() {
    return this.http.get<
      {
        _id: string
        message: { title: string; body: string }
        sentDate: string
      }[]
    >(environment.apiEndpoint + `/app/notif/check`, { withCredentials: true })
  }

  postInfoAck(id: string) {
    return this.http.post<Status>(
      environment.apiEndpoint + `/app/notif/${id}/ack`,
      undefined,
      { withCredentials: true }
    )
  }
}
