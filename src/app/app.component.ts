import { Component, Inject, LOCALE_ID } from '@angular/core';
import { AppUpdateService } from './services/app-update.service';
import { MatIconRegistry } from '@angular/material/icon';
import { Settings } from 'luxon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor (readonly updates: AppUpdateService, mir: MatIconRegistry, @Inject(LOCALE_ID) lang: string) {
    mir.setDefaultFontSetClass("material-symbols-rounded")
    Settings.defaultLocale = lang
  }
  title = 'Internat';
}
