import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { Group } from 'src/app/types/group';
import { STATE } from 'src/app/types/state';
import { Status } from 'src/app/types/status';
import User from 'src/app/types/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountMgmtService {

  constructor(private http: HttpClient) { }

  private _accs = new BehaviorSubject<Omit<User, 'pass'>[]>([])
  public readonly accs = this._accs.asObservable()
  private _state = signal(STATE.NOT_LOADED);
  public readonly state = this._state.asReadonly();
  private _error = signal<string | undefined>(undefined);
  public readonly error = this._error.asReadonly();

  public refresh() {
    this.getAccs()
  }

  private getAccs() {
    this._state.set(STATE.PENDING)
    this.http.get<{
      users: Omit<User, 'pass'>[]
      groups: Group[]
    }>(environment.apiEndpoint + `/admin/accs`, { withCredentials: true })
      .pipe(catchError((err: Error) => {
        this._state.set(STATE.ERROR)
        this._error.set(err.message)
        return of()
      }))
      .subscribe(v => {
        this._error.set(undefined)
        this._accs.next(v.users ?? [])
        this._state.set(STATE.LOADED)
      })
  }

  postAcc(item: Omit<User, "pass" | "_id" | "regDate">) {
    return this.http.post<Omit<User, "pass">>(
      environment.apiEndpoint + `/admin/accs`,
      item,
      { withCredentials: true }
    )
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
  }

  getUser(id: string) {
    return this.http.get<
      Omit<User, 'pass' | 'regDate'> & { lockout: boolean; regDate: string }
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

}
