import { Component, inject, OnInit, signal } from '@angular/core'
import { toObservable } from "@angular/core/rxjs-interop";
import { DateTime } from 'luxon'
import { filterLook, weekendFilter } from 'src/app/util'
import { CleanNote } from 'src/app/types/clean-note'
import { CleanService } from './clean.service';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrl: './clean.component.scss',
  standalone: false,
})
export class CleanComponent implements OnInit {
  private updates = inject(CleanService)

  grade: number | null = null
  notes: CleanNote[] = []
  tips = ''
  filter = weekendFilter
  protected day = signal<DateTime>(filterLook(this.filter, "behind", DateTime.now(), 7)!)

  constructor() {
    toObservable(this.day).subscribe(() => {
      this.update()
    })
  }

  ngOnInit(): void {
    this.update()
  }

  async update() {
    const upd = await this.updates.getClean(this.day())
    this.grade = upd?.grade || null
    this.notes = upd?.notes || []
    this.tips = upd?.tips || ''
  }
}
