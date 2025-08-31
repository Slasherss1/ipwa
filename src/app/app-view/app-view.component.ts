import { Component, inject, OnInit } from '@angular/core'
import { AuthClient } from '../services/auth.client'
import { SwPush } from '@angular/service-worker'
import { UpdatesService } from '../services/updates.service'
import { Link } from '../types/link'
import { LocalStorageService } from '../services/local-storage.service'
import { SyncService } from '../services/sync.service'

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss'],
  standalone: false,
})
export class AppViewComponent implements OnInit {
  private ac = inject(AuthClient)
  private swPush = inject(SwPush)
  private us = inject(UpdatesService)
  private ls = inject(LocalStorageService)
  private sync = inject(SyncService)


  private readonly _LINKS: Link[] = [
    {
      title: 'Jadłospis',
      href: 'menu',
      icon: 'restaurant_menu',
      enabled: this.ls.capCheck("menu"),
    },
    {
      title: 'Wiadomości',
      href: 'news',
      icon: 'newspaper',
      badge: this.ls.newsFlag,
      enabled: this.ls.capCheck("news"),
    },
    {
      title: 'Konto',
      href: 'grades',
      icon: 'account_circle',
      enabled: true
    }
  ]

  public get LINKS() {
    return this._LINKS.filter(v => {
      return v.enabled
    })
  }

  subscribeToNotif() {
    if (this.swPush.isEnabled && this.ls.capCheck("notif")) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.ls.vapid,
        })
        .then(sub => {
          this.us.postNotif(sub)
        })
    }
  }

  ngOnInit() {
    this.subscribeToNotif()
    this.sync.notifCheck()
    this.ac.check()
    this.us.getNews()
    this.us.news.subscribe(i => {
      const newsWithDates = i.map(v => ({ ...v, date: new Date(v.date) }))
      const newestDate = newsWithDates.sort((a, b) => b.date.getTime() - a.date.getTime())[0].date
      if (this.ls.newsDate.getTime() < newestDate.getTime()) {
        this.ls.newsFlag.set(newsWithDates.filter(v => {
          return v.date.getTime() > this.ls.newsDate.getTime()
        }).length)
        this.ls.newsDate = newestDate.toISOString()
      }
    })
  }
}
