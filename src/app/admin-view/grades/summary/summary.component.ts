import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ToolbarService } from '../../toolbar/toolbar.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { FormBuilder } from '@angular/forms'
import { MatSort } from '@angular/material/sort'
import { DateTime } from 'luxon'
import { GradesService } from '../grades.service'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  standalone: false,
})
export class SummaryComponent implements OnInit, OnDestroy {
  private toolbar = inject(ToolbarService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private ac = inject(GradesService)
  private fb = inject(FormBuilder)

  data: MatTableDataSource<{ room: string; avg: number }> =
    new MatTableDataSource<{ room: string; avg: number }>()
  collumns = ['room', 'avg']

  dateSelector = this.fb.group({
    start: this.fb.control(DateTime.utc().startOf('day')),
    end: this.fb.control(DateTime.utc().endOf('day')),
  })

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.data.sort = sort
  }

  constructor() {
    this.toolbar.comp = this
    this.toolbar.menu = [
      { check: true, title: 'Ocenianie', fn: 'goBack', icon: 'arrow_back' },
    ]
    this.dateSelector.valueChanges.subscribe(() => {
      this.download()
    })
  }
  ngOnInit(): void {
    this.download()
  }

  download() {
    this.ac.summary
      .getSummary(
        this.dateSelector.get('start')!.value!.startOf('day')!,
        this.dateSelector.get('end')!.value!.endOf('day')!
      )
      .subscribe(v => {
        this.data.data = v
      })
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.toolbar.comp = undefined
    this.toolbar.menu = undefined
  }
}
