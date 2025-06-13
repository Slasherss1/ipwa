import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { STATE } from 'src/app/types/state';
import { Status } from 'src/app/types/status';
import { User, UserAPI } from 'src/app/admin-view/account-mgmt/account.model';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class AccountMgmtService {

  constructor(private http: HttpClient) { }

  private _accs = new BehaviorSubject<User[]>([])
  public readonly accs = this._accs.asObservable()
  private _state = signal(STATE.NOT_LOADED);
  public readonly state = this._state.asReadonly();
  private _error = signal<string | undefined>(undefined);
  public readonly error = this._error.asReadonly();
  private _selAcc = new BehaviorSubject<User | null>(null)
  public readonly selAcc = this._selAcc.asObservable()

  public refresh() {
    this.getAccs()
  }

  private getAccs() {
    this._state.set(STATE.PENDING)
    this.http.get
      <UserAPI[]>
      (environment.apiEndpoint + `/admin/accs`, { withCredentials: true })
      .pipe(
        catchError((err: Error) => {
          this._state.set(STATE.ERROR)
          this._error.set(err.message)
          return of()
        }),
        map<UserAPI[], User[]>(v => {
          return v.map(i => ({
            ...i,
            regDate: DateTime.fromISO(i.regDate)
          }))
        })
      ).subscribe(v => {
        this._error.set(undefined)
        this._accs.next(v ?? [])
        this._state.set(STATE.LOADED)
      })
  }

  selectAccount(acc: User) {
    this._selAcc.next(acc)
  }

  //#region legacy
  postAcc(item: Omit<User, "_id" | "regDate">) {
    return this.http.post<User>(
      environment.apiEndpoint + `/admin/accs`,
      item,
      { withCredentials: true }
    ).pipe(tap(v => {
      if (v instanceof Array) this.refresh()
    }))
  }

  putAcc(id: string, update: Partial<User>) {
    return this.http.put<Status>(
      environment.apiEndpoint + `/admin/accs/${id}`,
      update,
      { withCredentials: true }
    )
  }

  resetPass(id: string) {
    return this.http.patch<Status>(
      environment.apiEndpoint + `/admin/accs/${id}/reset`,
      undefined,
      { withCredentials: true }
    )
  }

  deleteAcc(id: string) {
    return this.http.delete<Status>(
      environment.apiEndpoint + `/admin/accs/${id}`,
      { withCredentials: true }
    )
      .pipe(tap(v => {
        if (v.status == 200) this.refresh()
      }))
  }

  getUser(id: string) {
    return this.http.get<
      Omit<User, 'regDate'> & { lockout: boolean; regDate: string }
    >(environment.apiEndpoint + `/admin/accs/${id}`, {
      withCredentials: true,
    })
  }

  clearLockout(id: string) {
    return this.http.delete<Status>(
      environment.apiEndpoint + `/admin/accs/${id}/lockout`,
      { withCredentials: true }
    )
  }
  //#endregion
}
