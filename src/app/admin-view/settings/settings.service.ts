import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUSettings } from './settings.component';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/types/status';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private http = inject(HttpClient)

  getAll() {
    return this.http.get<IUSettings>(
      environment.apiEndpoint + `/admin/settings/`,
      { withCredentials: true }
    )
  }

  post(settings: IUSettings) {
    return this.http.post<Status>(
      environment.apiEndpoint + `/admin/settings/`,
      settings,
      { withCredentials: true }
    )
  }

  reload() {
    return this.http.get<Status>(
      environment.apiEndpoint + `/admin/settings/reload/`,
      { withCredentials: true }
    )
  }
}
