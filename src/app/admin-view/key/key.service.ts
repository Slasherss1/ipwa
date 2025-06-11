import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { map } from 'rxjs';
import { AKey } from 'src/app/types/key';
import { Status } from 'src/app/types/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor(
    private http: HttpClient
  ) { }

  getKeys() {
    return this.http
      .get<
        (Omit<AKey, 'borrow' | 'tb'> & { borrow: string; tb?: string })[]
      >(environment.apiEndpoint + `/admin/keys`, { withCredentials: true })
      .pipe(
        map(v => {
          return v.map(r => {
            let newkey: any = { ...r }
            newkey.borrow = DateTime.fromISO(r.borrow!)
            if (newkey.tb) newkey.tb = DateTime.fromISO(r.tb!)
            return newkey as AKey
          })
        })
      )
  }

  avalKeys() {
    return this.http.get<string[]>(
      environment.apiEndpoint + `/admin/keys/available`,
      { withCredentials: true }
    )
  }

  postKey(room: string, uname: string) {
    return this.http.post<Status>(
      environment.apiEndpoint + `/admin/keys/`,
      { room: room, whom: uname },
      { withCredentials: true }
    )
  }

  returnKey(id: string) {
    return this.putKeys(id, { tb: DateTime.now() })
  }

  private putKeys(id: string, update: Partial<AKey>) {
    return this.http.put<Status>(
      environment.apiEndpoint + `/admin/keys/${id}`,
      update,
      { withCredentials: true }
    )
  }

}
