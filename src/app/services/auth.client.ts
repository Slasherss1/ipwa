import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Status } from '../types/status';

@Injectable({
  providedIn: 'root'
})
export class AuthClient {
  constructor(private http: HttpClient, private router: Router, private ls: LocalStorageService) { }

  public login(uname: string, pass: string) {
    return this.http.post<any>(environment.apiEndpoint + '/auth/login', {
      username: uname,
      password: pass
    }, {withCredentials: true})
  }

  public logout() {
    return this.http.delete(environment.apiEndpoint+"/auth/logout", {withCredentials: true})
  }

  public check() {
    this.http.get(environment.apiEndpoint + '/auth/check', {withCredentials: true}).pipe(catchError((err) => {
      if (err.status == 401 && this.ls.loggedIn) {
        this.ls.logOut()
        this.router.navigateByUrl("/login")
        return EMPTY
      }
      return throwError(() => new Error(err.message))
    })).subscribe((data: any)=>{
      if (data.admin) { this.ls.admin = data.admin } else { this.ls.admin = false }
      if (this.ls.capFlag != data.features) {
        this.ls.capFlag = data.features
        document.location.reload()
      }
      this.ls.room = data.room
      if (data.menu.defaultItems) {
        this.ls.defaultItems = data.menu.defaultItems
      }
    })
  }

  public chpass(oldpass:string,newpass:string) {
    return this.http.post(environment.apiEndpoint + '/auth/chpass', {"oldPass": oldpass, "newPass": newpass}, {withCredentials: true, responseType: "text"})
  }
}
