import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Menu, MenuAPI } from 'src/app/types/menu';
import { STATE } from 'src/app/types/state';
import { Status } from 'src/app/types/status';
import { environment } from 'src/environments/environment';
import { MenuOptions } from './menu-edit.model';

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {
  private http = inject(HttpClient)

  private _menuItems = new BehaviorSubject<Menu[]>([])
  public readonly menuItems = this._menuItems.asObservable()
  private _state = signal(STATE.NOT_LOADED);
  public readonly state = this._state.asReadonly();
  private _error = signal<string | undefined>(undefined);
  public readonly error = this._error.asReadonly();

  private seDates: {
    start: DateTime | null,
    end: DateTime | null
  } = {
      start: null,
      end: null
    }

  public setDates(start: DateTime | null, end: DateTime | null) {
    this.seDates.start = start
    this.seDates.end = end
  }

  public refresh() {
    this.getMenu()
  }

  private getMenu() {
    if (!(this.seDates.start && this.seDates.end)) return
    this._state.set(STATE.PENDING)
    const body = { start: this.seDates.start.toString(), end: this.seDates.end.toString() }
    this.http.get
      <MenuAPI[]>
      (environment.apiEndpoint + `/admin/menu`, { withCredentials: true, params: body })
      .pipe(
        catchError((err: Error) => {
          this._state.set(STATE.ERROR)
          this._error.set(err.message)
          return of()
        }),
        map<MenuAPI[], Menu[]>(v =>
          v.map(i => ({
            ...i,
            day: DateTime.fromISO(i.day)
          })))
      ).subscribe(v => {
        this._error.set(undefined)
        this._menuItems.next(v ?? [])
        this._state.set(STATE.LOADED)
      })
  }

  getOpts() {
    return this.http.get<MenuOptions>(environment.apiEndpoint + `/admin/menu/opts`, {
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
