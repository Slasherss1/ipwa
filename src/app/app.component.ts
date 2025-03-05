import { Component } from '@angular/core';
import { AppUpdateService } from './services/app-update.service';
import { MatIconRegistry } from '@angular/material/icon';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (readonly updates: AppUpdateService, mir: MatIconRegistry) {
    mir.setDefaultFontSetClass("material-symbols-rounded")
    moment.updateLocale('pl', {
      weekdays: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
    })
    moment.locale('pl')
  }
  title = 'Internat';
}
