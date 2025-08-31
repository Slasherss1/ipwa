import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Notification } from 'src/app/types/notification';
import { STATE } from 'src/app/types/state';
import { environment } from 'src/environments/environment';
import { Message, MessageAPI, MessageRecipients } from './notifications.model';
import { Status } from 'src/app/types/status';

export interface SendResult {
  sent: number;
  possible: number
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private http = inject(HttpClient)

  private _msgs = new BehaviorSubject<Message[]>([])
  public readonly msgs = this._msgs.asObservable()
  private _state = signal(STATE.NOT_LOADED);
  public readonly state = this._state.asReadonly();
  private _error = signal<string | undefined>(undefined);
  public readonly error = this._error.asReadonly();

  send(n: Notification) {
    return this.http.post<SendResult | Status>(
      environment.apiEndpoint + '/admin/notif/send',
      n,
      { withCredentials: true }
    )
  }

  public refreshOutbox() {
    this.getOutbox()
  }

  private getOutbox() {
    this._state.set(STATE.PENDING)
    this.http.get
      <MessageAPI[]>
      (environment.apiEndpoint + '/admin/notif/outbox', { withCredentials: true })
      .pipe(
        catchError((err: Error) => {
          this._state.set(STATE.ERROR)
          this._error.set(err.message)
          return of()
        }),
        map<MessageAPI[], Message[]>(v =>
          v.map(i => ({
            ...i,
            sentDate: DateTime.fromISO(i.sentDate),
          }))
        )
      ).subscribe(v => {
        this._error.set(undefined)
        this._msgs.next(v ?? [])
        this._state.set(STATE.LOADED)
      })
  }

  getMessageBody(id: string) {
    this._state.set(STATE.PENDING)
    this.http.get(
      environment.apiEndpoint + `/admin/notif/outbox/${id}/message`,
      { withCredentials: true, responseType: 'text' }
    )
      .pipe(
        catchError((err: Error) => {
          this._state.set(STATE.ERROR)
          this._error.set(err.message)
          return of()
        })
      )
      .subscribe(msg => {
        this._error.set(undefined)
        const msgTemp = this._msgs.value.map(v => {
          if (v._id === id) {
            return {
              ...v,
              message: msg
            }
          }
          return v
        })
        this._msgs.next(msgTemp)
        this._state.set(STATE.LOADED)
      })
  }

  getMessageRcpts(id: string) {
    this.http.get
      <MessageRecipients[]>
      (environment.apiEndpoint + `/admin/notif/outbox/${id}/rcpts`, { withCredentials: true, })
      .pipe(
        catchError((err: Error) => {
          this._state.set(STATE.ERROR)
          this._error.set(err.message)
          return of()
        })
      )
      .subscribe(rcpts => {
        this._error.set(undefined)
        const msgTemp = this._msgs.value.map(v => {
          if (v._id === id) {
            return {
              ...v,
              rcpts: rcpts
            }
          }
          return v
        })
        this._msgs.next(msgTemp)
        this._state.set(STATE.LOADED)
      })
  }
}
