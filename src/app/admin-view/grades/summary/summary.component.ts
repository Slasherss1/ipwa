import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCommService } from '../../admin-comm.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit, OnDestroy {

  data: MatTableDataSource<{room: string, avg: number}> = new MatTableDataSource<{room: string, avg: number}>();
  collumns = ['room', 'avg']

  dateSelector = this.fb.group({
    start: this.fb.control(moment.utc().startOf('day')),
    end: this.fb.control(moment.utc().endOf('day'))
  })

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.data.sort = sort
  }

  constructor (private toolbar: ToolbarService, private router: Router, private route: ActivatedRoute, private ac: AdminCommService, private fb: FormBuilder) {
    this.toolbar.comp = this
    this.toolbar.menu = [
      {check: true, title: "Ocenianie", fn: "goBack", icon: "arrow_back"}
    ]
    this.dateSelector.valueChanges.subscribe((v) => {
      this.download()
    })
  }
  ngOnInit(): void {
    this.download()
  }
  
  download() {
    this.ac.clean.summary.getSummary(this.dateSelector.get('start')?.value!.startOf('day')!, this.dateSelector.get('end')?.value!.endOf('day')!).subscribe((v) => {
      this.data.data = v
    })
  }
  
  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.toolbar.comp = undefined
    this.toolbar.menu = undefined
  }
  
}
