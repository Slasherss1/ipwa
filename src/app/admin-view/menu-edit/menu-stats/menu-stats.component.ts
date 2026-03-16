import { Component, inject } from '@angular/core';
import { MenuEditService } from '../menu-edit.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { FDSelection } from 'src/app/fd.da';

@Component({
  selector: 'app-menu-stats',
  standalone: false,
  templateUrl: './menu-stats.component.html',
  styleUrl: './menu-stats.component.scss',
  providers: [
    { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: FDSelection },
  ],
})
export class MenuStatsComponent {
  protected ss = inject(MenuEditService)

  range = new FormGroup({
    start: new FormControl<DateTime | null>(null),
    end: new FormControl<DateTime | null>(null),
  })

  constructor() {
    this.range.setValue(this.ss.seDates())
    this.range.valueChanges.subscribe(v => {
      this.ss.seDates.set({ start: v.start!, end: v.end! })
    })
  }
}
