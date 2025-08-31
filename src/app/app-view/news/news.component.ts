import { Component, effect, inject, OnInit } from '@angular/core'
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
  protected newsapi = inject(UpdatesService)
  private ls = inject(LocalStorageService)
  news: News[] = []

  async ngOnInit() {
    this.newsapi.news.subscribe(i => {
      this.news = i.map(v => {
        return { ...v, content: marked.parse(v.content, { breaks: true }).toString() }
      })
      // var date = this.news.map(v => ({ ...v, date: new Date(v.date) })).sort((a, b) => b.date.getTime() - a.date.getTime())[0].date
      // if (date > this.ls.newsDate) {
      //   this.ls.newsDate = date.toISOString()
      // }
      this.ls.newsFlag.set(null)
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
