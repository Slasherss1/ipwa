import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { marked } from 'marked';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { News } from 'src/app/types/news.model';
import { STATE } from 'src/app/types/state';
import { Status } from 'src/app/types/status';
import { environment } from 'src/environments/environment';
import { NewsFormatted } from './news-edit.model';

@Injectable({
  providedIn: 'root'
})
export class NewsEditService {
  private http = inject(HttpClient)

  private _news = new BehaviorSubject<NewsFormatted[]>([])
  public readonly news = this._news.asObservable()
  private _state = signal(STATE.NOT_LOADED);
  public readonly state = this._state.asReadonly();
  private _error = signal<string | undefined>(undefined);
  public readonly error = this._error.asReadonly();

  public refresh() {
    this.getNews()
  }

  private getNews() {
    this._state.set(STATE.PENDING)
    this.http.get
      <News[]>
      (environment.apiEndpoint + `/admin/news`, { withCredentials: true, })
      .pipe(
        catchError((err: Error) => {
          this._state.set(STATE.ERROR)
          this._error.set(err.message)
          return of()
        }),
        map<News[], NewsFormatted[]>(i => {
          return i.map(v => ({
            ...v,
            formatted: marked.parse(v.content, { breaks: true }).toString()
          }))
        })
      ).subscribe(v => {
        this._error.set(undefined)
        this._news.next(v ?? [])
        this._state.set(STATE.LOADED)
      })
  }

  postNews(title: string, content: string) {
    return this.http.post<Status>(
      environment.apiEndpoint + `/admin/news`,
      { title: title, content: content },
      { withCredentials: true }
    )
  }

  deleteNews(id: string) {
    return this.http.delete<Status>(
      environment.apiEndpoint + `/admin/news/${id}`,
      { withCredentials: true }
    )
  }

  toggleNews(id: string, inverter: boolean) {
    return this.putNews(id, { visible: !inverter })
  }

  togglePin(id: string, inverter: boolean) {
    return this.putNews(id, { pinned: !inverter })
  }

  updateNews(id: string, title: string, content: string) {
    return this.putNews(id, {
      title: title,
      content: content,
      date: Date.now,
    })
  }

  private putNews(id: string, update: object) {
    return this.http.put<Status>(
      environment.apiEndpoint + `/admin/news/${id}`,
      update,
      { withCredentials: true }
    )
  }

}
