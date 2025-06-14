import { Component, OnInit, signal } from '@angular/core'
import { toObservable } from "@angular/core/rxjs-interop";
import { DateTime } from 'luxon'
import { filterLook, weekendFilter } from 'src/app/util'
import { UpdatesService } from 'src/app/services/updates.service'
import { CleanNote } from 'src/app/types/clean-note'

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrl: './clean.component.scss',
  standalone: false,
})
export class CleanComponent implements OnInit {
  grade: number | null = null
  notes: CleanNote[] = []
  tips: string = ''
  filter = weekendFilter
  protected day = signal<DateTime>(filterLook(this.filter, "behind", DateTime.now(), 7)!)

  constructor(private updates: UpdatesService) {
    toObservable(this.day).subscribe(v => {
      this.update()
    })
  }

  ngOnInit(): void {
    this.update()
  }

  update() {
    this.updates.getClean(this.day()).subscribe(v => {
      if (v) {
        this.grade = v.grade
        this.notes = v.notes
        this.tips = v.tips
      } else {
        this.grade = null
        this.notes = []
        this.tips = ''
      }
    })
  }
}
