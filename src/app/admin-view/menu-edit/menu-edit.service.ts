import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Menu } from 'src/app/types/menu';
import { Status } from 'src/app/types/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {

  constructor(private http: HttpClient) { }

  getMenu(start?: DateTime | null, end?: DateTime | null) {
    if (start && end) {
      const body = { start: start.toString(), end: end.toString() }
      return this.http.get<(Omit<Menu, 'day'> & { day: string })[]>(
        environment.apiEndpoint + '/admin/menu',
        { withCredentials: true, params: body }
      )
    }
    return
  }

  getOpts() {
    return this.http.get<any>(environment.apiEndpoint + `/admin/menu/opts`, {
      withCredentials: true,
    })
  }

  postMenu(file: File) {
    if (file) {
      const formData = new FormData()
      formData.append('menu', file)
      return this.http.post<Status>(
        environment.apiEndpoint + '/admin/menu/upload',
        formData,
        { withCredentials: true }
      )
    }
    return
  }

  editSn(id: string, content: Menu['sn']) {
    return this.putMenu(id, { sn: content })
  }

  editOb(id: string, content: Menu['ob']) {
    return this.putMenu(id, { ob: content })
  }

  editKol(id: string, content: Menu['kol']) {
    return this.putMenu(id, { kol: content })
  }

  editTitle(id: string, content: Menu['dayTitle']) {
    return this.putMenu(id, { dayTitle: content })
  }

  print(start?: DateTime | null, end?: DateTime | null) {
    if (start && end) {
      const body = { start: start.toString(), end: end.toString() }
      return this.http.get(environment.apiEndpoint + '/admin/menu/print', {
        withCredentials: true,
        params: body,
        responseType: 'text',
      })
    }
    return
  }

  stat(day: DateTime, m: 'ob' | 'kol') {
    return this.http.get<{ y: number; n: number }>(
      environment.apiEndpoint + `/admin/menu/${day.toISO()}/votes/${m}`,
      { withCredentials: true }
    )
  }

  new = {
    single: (day: DateTime) => {
      return this.http.post<Status>(
        environment.apiEndpoint + `/admin/menu/${day.toISO()}`,
        null,
        { withCredentials: true }
      )
    },
    range: (start: DateTime, count: number) => {
      return this.http.post<Status>(
        environment.apiEndpoint + `/admin/menu/${start.toISO()}/${count}/`,
        null,
        { withCredentials: true }
      )
    },
  }
  rm(id: string) {
    return this.http.delete<Status>(
      environment.apiEndpoint + `/admin/menu/${id}`,
      { withCredentials: true }
    )
  }

  private putMenu(id: string, update: Partial<Menu>) {
    return this.http.put<Status>(
      environment.apiEndpoint + `/admin/menu/${id}`,
      update,
      { withCredentials: true }
    )
  }
}
