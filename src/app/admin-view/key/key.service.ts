import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { map } from 'rxjs';
import { AKey, AKeyAPI } from 'src/app/types/key';
import { Status } from 'src/app/types/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private http = inject(HttpClient)

  getKeys() {
    return this.http
      .get<AKeyAPI[]>(environment.apiEndpoint + `/admin/keys`, { withCredentials: true })
      .pipe(
        map<AKeyAPI[], AKey[]>(v => v.map(r => ({
          ...r,
          borrow: DateTime.fromISO(r.borrow!),
          tb: r.tb ? DateTime.fromISO(r.tb!) : undefined
        })))
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
