import { Component, inject, LOCALE_ID, OnInit } from '@angular/core'
import { AppUpdateService } from './services/app-update.service'
import { MatIconRegistry } from '@angular/material/icon'
import { Settings } from 'luxon'
import { LocalStorageService } from './services/local-storage.service'
import { SyncService } from './services/sync.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  readonly updates = inject(AppUpdateService)
  mir = inject(MatIconRegistry)
  lang = inject(LOCALE_ID)
  private ls = inject(LocalStorageService)
  private sync = inject(SyncService)
  private sb = inject(MatSnackBar)


  constructor() {
    this.mir.setDefaultFontSetClass('material-symbols-rounded')
    Settings.defaultLocale = this.lang
  }

  ngOnInit(): void {
    if (this.ls.loggedIn) {
      this.sync.subscribe()
      this.sync.newsEvents.subscribe(v => {
        this.sb.open(v === "create" ? "Nowe wiadomości" : "Zmieniono treść wiadomości", 'Zamknij', {
          duration: 5000,
          verticalPosition: 'bottom',
        })
      })
      this.sync.notifEvents.subscribe(v => {
        this.sync.notifCheck()
      })
    }
  }

  title = 'Internat'
}
