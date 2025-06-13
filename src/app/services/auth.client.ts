import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, EMPTY, tap, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { LocalStorageService } from './local-storage.service'
import { Status } from '../types/status'

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ls: LocalStorageService
  ) {}

  private _redirect: string = ''
  public get redirect(): string {
    return this._redirect
  }
  public set redirect(value: string) {
    this._redirect = value
    this.putRedirect(value).subscribe()
  }

  public login(uname: string, pass: string) {
    return this.http
      .post<Status & { admin: string[]; redirect: string }>(
        environment.apiEndpoint + '/auth/login',
        {
          username: uname,
          password: pass,
        },
        { withCredentials: true }
      )
      .pipe(
        tap(v => {
          if (v.redirect) this._redirect = v.redirect
        })
      )
  }

  public logout() {
    return this.http.delete(environment.apiEndpoint + '/auth/logout', {
      withCredentials: true,
    })
  }

  public check() {
    this.http
      .get<{
        admin?: string[]
        room?: string
        features: number
        menu: {
          defaultItems: {
            sn: string[]
            kol: string[]
          }
        }
        vapid: string
      }>(environment.apiEndpoint + '/auth/check', { withCredentials: true })
      .pipe(
        catchError(err => {
          if (err.status == 401 && this.ls.loggedIn) {
            this.ls.logOut()
            this.router.navigateByUrl('/login')
            return EMPTY
          }
          return throwError(() => new Error(err.message))
        })
      )
      .subscribe(data => {
        this.ls.admin = data.admin
        if (this.ls.capFlag != data.features) {
          this.ls.capFlag = data.features
          document.location.reload()
        }
        this.ls.room = data.room
        this.ls.vapid = data.vapid
        if (data.menu.defaultItems) {
          this.ls.defaultItems = data.menu.defaultItems
        }
      })
  }

  public chpass(oldpass: string, newpass: string) {
    return this.http.post(
      environment.apiEndpoint + '/auth/chpass',
      { oldPass: oldpass, newPass: newpass },
      { withCredentials: true, responseType: 'text' }
    )
  }

  private putRedirect(redirect: string) {
    return this.http.put<Status>(
      environment.apiEndpoint + '/auth/redirect',
      { redirect: redirect },
      { withCredentials: true }
    )
  }
}
