import { Component, inject, OnInit } from '@angular/core'
import { ToolbarService } from '../../toolbar/toolbar.service'
import { Router, ActivatedRoute } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { GradesService } from '../grades.service'

@Component({
  selector: 'app-attendence-summary',
  templateUrl: './attendence-summary.component.html',
  styleUrl: './attendence-summary.component.scss',
  standalone: false,
})
export class AttendenceSummaryComponent implements OnInit {
  data: MatTableDataSource<{
    room: string
    hours: string[]
    notes: string
    auto: boolean
  }> = new MatTableDataSource<{
    room: string
    hours: string[]
    notes: string
    auto: boolean
  }>()
  collumns = ['room', 'hours', 'actions']

  private toolbar = inject(ToolbarService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private ac = inject(GradesService)

  constructor() {
    this.toolbar.comp = this
    this.toolbar.menu = [
      { check: true, title: 'Ocenianie', fn: 'goBack', icon: 'arrow_back' },
    ]
  }

  delete(room: string) {
    this.ac.attendence.deleteRoom(room).subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.ac.attendence.getSummary().subscribe(v => {
      this.data.data = v
    })
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
