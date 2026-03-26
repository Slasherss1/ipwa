import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { MenuStats } from 'src/app/types/menu-stats';
import { STATE } from 'src/app/types/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemStatsService {
  protected http = inject(HttpClient)

  private _menuItems = new BehaviorSubject<MenuStats>({
    name: '',
    type: 'other',
    value: {
      comments: [],
      rating: 0,
      tags: {}
    }
  });
  public readonly menuItems = this._menuItems.asObservable()
  private _state = signal(STATE.NOT_LOADED);
  public readonly state = this._state.asReadonly();
  private _error = signal<string | undefined>(undefined);
  public readonly error = this._error.asReadonly();

  public date = signal<DateTime | null>(null)
  public item = signal<string>('')

  public refresh() {
    this.getStats()
  }

  private getStats() {
    if (!(this.date() && this.item())) return
    this._state.set(STATE.PENDING)
    const body = { date: this.date()!.toString(), item: this.item() }
    this.http.get
      <MenuStats>
      (environment.apiEndpoint + `/admin/menu/editor/stats`, { withCredentials: true, params: body })
      .pipe(
        catchError((err: Error) => {
          this._state.set(STATE.ERROR)
          this._error.set(err.message)
          return of()
        })
      ).subscribe(v => {
        this._error.set(undefined)
        this._menuItems.next(v)
        this._state.set(STATE.LOADED)
      })
  }
}
