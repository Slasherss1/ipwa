import { Component, inject, LOCALE_ID } from '@angular/core'
import { AppUpdateService } from './services/app-update.service'
import { MatIconRegistry } from '@angular/material/icon'
import { Settings } from 'luxon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  readonly updates = inject(AppUpdateService)
  mir = inject(MatIconRegistry)
  lang = inject(LOCALE_ID)
  constructor() {
    this.mir.setDefaultFontSetClass('material-symbols-rounded')
    Settings.defaultLocale = this.lang
  }
  title = 'Internat'
}
