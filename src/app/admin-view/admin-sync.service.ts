import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../types/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSyncService {

  constructor(private http: HttpClient) { }

  private _data: any

  private sync() {
    this.http.get(environment.apiEndpoint + `/admin/sync`, { withCredentials: true }).subscribe(v => {
      this._data = v
    })
  }

  public get groups(): Group[] {
    var groups = this._data?.groups
    if (!groups) this.sync()
    return groups
  }

}
