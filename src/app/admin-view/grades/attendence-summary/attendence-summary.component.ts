import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AdminCommService } from '../../admin-comm.service';

@Component({
  selector: 'app-attendence-summary',
  templateUrl: './attendence-summary.component.html',
  styleUrl: './attendence-summary.component.scss'
})
export class AttendenceSummaryComponent implements OnInit {

  data: MatTableDataSource<{room: string, hours: string[], notes: string, auto: boolean}> = new MatTableDataSource<{room: string, hours: string[], notes: string, auto: boolean}>();
  collumns = ['room', 'hours', 'actions']

  constructor (private toolbar: ToolbarService, private router: Router, private route: ActivatedRoute, private ac: AdminCommService) {
    this.toolbar.comp = this
    this.toolbar.menu = [
      {check: true, title: "Ocenianie", fn: "goBack", icon: "arrow_back"}
    ]
  }

  delete(room: string) {
    this.ac.clean.attendence.deleteRoom(room).subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.ac.clean.attendence.getSummary().subscribe(v => {
      this.data.data = v
    })
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
