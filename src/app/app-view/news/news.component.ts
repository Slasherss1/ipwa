import { Component, inject, OnInit } from '@angular/core'
import { UpdatesService } from '../../services/updates.service'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { News } from 'src/app/types/news.model'
import { marked } from 'marked'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: false,
})
export class NewsComponent implements OnInit {
  private newsapi = inject(UpdatesService)
  private ls = inject(LocalStorageService)

  news: News[] = []
  loading = true

  ngOnInit() {
    this.ls.newsflag = false
    this.loading = true
    this.news = this.ls.news
    this.newsapi.getNews().subscribe(data => {
      this.loading = false
      this.news = data.map(v => {
        v.content = marked.parse(v.content, { breaks: true }).toString()
        return v
      })
      this.ls.news = this.news
    })
  }

  fullName(n: News): string {
    const { author: { fname, surname, uname } } = n;
    if (fname || surname) {
      return [fname, surname].filter(Boolean).join(' ');
    }
    return uname;
  }
}
