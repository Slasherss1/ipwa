import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Group } from '../types/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSyncService {
  private http = inject(HttpClient)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _data: any

  private sync() {
    this.http.get(environment.apiEndpoint + `/admin/sync`, { withCredentials: true }).subscribe(v => {
      this._data = v
    })
  }

  public get groups(): Group[] {
    const groups = this._data?.groups
    if (!groups) this.sync()
    return groups
  }

}
