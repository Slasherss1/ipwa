import { Component, inject } from '@angular/core';
import { MenuEditService } from '../menu-edit.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { FDSelection } from 'src/app/fd.da';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/types/menu';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemStatsDialogComponent } from './menu-item-stats-dialog/menu-item-stats-dialog.component';

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
  protected ls = inject(LocalStorageService)
  protected dialog = inject(MatDialog)

  dcols: string[] = ['day', 'sn', 'ob', 'kol']

  range = new FormGroup({
    start: new FormControl<DateTime | null>(null),
    end: new FormControl<DateTime | null>(null),
  })
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource<Menu>()

  constructor() {
    this.range.setValue(this.ss.seDates())
    this.range.valueChanges.subscribe(v => {
      this.ss.seDates.set({ start: v.start!, end: v.end! })
    })
    this.ss.menuItems.subscribe(v => {
      this.dataSource.data = v
    })
  }

  openDialog(date: DateTime, item: string) {
    this.dialog.open(MenuItemStatsDialogComponent, {
      data: { date, item }
    })
  }
}
