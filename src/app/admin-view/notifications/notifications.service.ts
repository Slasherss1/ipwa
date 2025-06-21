import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { map } from 'rxjs';
import { Group } from 'src/app/types/group';
import { Notification } from 'src/app/types/notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private http = inject(HttpClient)

  send(n: Notification) {
    return this.http.post<{ sent: number; possible: number }>(
      environment.apiEndpoint + '/admin/notif/send',
      n,
      { withCredentials: true }
    )
  }

  getGroups() {
    return this.http.get<Group[]>(
      environment.apiEndpoint + '/admin/notif/groups',
      { withCredentials: true }
    )
  }

  outbox = {
    getSent: () => {
      return this.http
        .get<
          { _id: string; sentDate: string; title: string }[]
        >(environment.apiEndpoint + '/admin/notif/outbox', { withCredentials: true })
        .pipe(
          map(v =>
            v.map(i => ({
              ...i,
              sentDate: DateTime.fromISO(i.sentDate),
            }))
          )
        )
    },
    getBody: (id: string) => {
      return this.http.get(
        environment.apiEndpoint + `/admin/notif/outbox/${id}/message`,
        { withCredentials: true, responseType: 'text' }
      )
    },
    getRcpts: (id: string) => {
      return this.http.get<
        {
          _id: string
          uname: string
          room?: string
          fname?: string
          surname?: string
        }[]
      >(environment.apiEndpoint + `/admin/notif/outbox/${id}/rcpts`, {
        withCredentials: true,
      })
    },
  }
}
