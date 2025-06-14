import { Component, OnInit } from '@angular/core'
import { DateTime } from 'luxon'
import { weekendFilter } from 'src/app/fd.da'
import { UpdatesService } from 'src/app/services/updates.service'
import { CleanNote } from 'src/app/types/clean-note'

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrl: './clean.component.scss',
  standalone: false,
})
export class CleanComponent implements OnInit {
  protected day: string
  grade: number | null = null
  notes: CleanNote[] = []
  tips: string = ''
  filter = weekendFilter

  constructor(private updates: UpdatesService) {
    this.day = DateTime.now().toISODate()
  }

  ngOnInit(): void {
    this.update()
  }

  update() {
    this.updates.getClean(this.day).subscribe(v => {
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
