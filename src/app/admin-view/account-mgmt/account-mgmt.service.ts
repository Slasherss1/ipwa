import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/types/group';
import { Status } from 'src/app/types/status';
import User from 'src/app/types/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountMgmtService {

  constructor(private http: HttpClient) { }

  getAccs() {
    return this.http.get<{
      users: Omit<User, 'pass'>[]
      groups: Group[]
    }>(environment.apiEndpoint + `/admin/accs`, { withCredentials: true })
  }

  postAcc(item: any) {
    return this.http.post<Status>(
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
      {},
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
