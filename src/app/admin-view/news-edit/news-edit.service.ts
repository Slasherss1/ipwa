import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from 'src/app/types/news';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsEditService {

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get<News[]>(environment.apiEndpoint + `/admin/news`, {
      withCredentials: true,
    })
  }

  postNews(title: string, content: string) {
    return this.http.post<any>(
      environment.apiEndpoint + `/admin/news`,
      { title: title, content: content },
      { withCredentials: true }
    )
  }

  deleteNews(id: string) {
    return this.http.delete<any>(
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
    return this.http.put<any>(
      environment.apiEndpoint + `/admin/news/${id}`,
      update,
      { withCredentials: true }
    )
  }

}
