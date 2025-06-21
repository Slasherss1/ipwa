import { Component, inject, OnInit } from '@angular/core'
import { AuthClient } from '../services/auth.client'
import { SwPush } from '@angular/service-worker'
import { UpdatesService } from '../services/updates.service'
import { Link } from '../types/link'
import { LocalStorageService } from '../services/local-storage.service'
import { interval } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { NotifDialogComponent } from './notif-dialog/notif-dialog.component'

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
  private sb = inject(MatSnackBar)
  private dialog = inject(MatDialog)

  private readonly _LINKS: Link[] = [
    {
      title: 'Jadłospis',
      href: 'menu',
      icon: 'restaurant_menu',
      enabled: this.ls.capCheck(2),
    },
    {
      title: 'Wiadomości',
      href: 'news',
      icon: 'newspaper',
      enabled: this.ls.capCheck(1),
    },
    { title: 'Konto', href: 'grades', icon: 'account_circle', enabled: true },
  ]

  public get LINKS() {
    return this._LINKS.filter(v => {
      return v.enabled
    })
  }

  subscribeToNotif() {
    if (this.swPush.isEnabled && this.ls.capCheck(4)) {
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
    this.ac.check()
    this.newsCheck()
    interval(1000 * 60 * 15).subscribe(this.newsCheck)
  }

  newsCheck() {
    if (this.ls.capCheck(4)) {
      this.us.getNotifCheck().subscribe(s => {
        s.forEach(v => {
          this.dialog.open(NotifDialogComponent, { data: v })
        })
      })
    }
    if (this.ls.newsflag) return
    this.us.newsCheck().subscribe(s => {
      if (s.hash != this.ls.newsCheck.hash) {
        this.ls.newsflag = this.ls.newsCheck.count - s.count
        this.ls.newsCheck = s
        this.sb.open('Nowe wiadomości', 'Zamknij', {
          duration: 5000,
          verticalPosition: 'bottom',
        })
      }
    })
  }
}
