import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { MenuItemStatsService } from './menu-item-stats.service';

@Component({
  selector: 'app-menu-item-stats-dialog',
  standalone: false,
  templateUrl: './menu-item-stats-dialog.component.html',
  styleUrl: './menu-item-stats-dialog.component.scss'
})
export class MenuItemStatsDialogComponent implements OnInit {
  public data: { date: DateTime; item: string } = inject(MAT_DIALOG_DATA)
  protected msi = inject(MenuItemStatsService)

  protected rating = 0;
  protected comments: string[] = [];
  protected tags: Record<string, number> = {}
  protected count = 0;

  ngOnInit(): void {
    this.msi.date.set(this.data.date)
    this.msi.item.set(this.data.item)
    this.msi.refresh()

    this.msi.menuItems.subscribe(v => {
      this.rating = v.value.rating ?? 0
      this.comments = v.value.comments ?? []
      this.tags = v.value.tags ?? {}
      this.count = v.value.count ?? 0
    })
  }

}
