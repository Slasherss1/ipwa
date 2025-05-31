import { Component, OnInit } from '@angular/core';
import { AdminCommService } from '../../admin-comm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarService } from '../../toolbar/toolbar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.scss'
})
export class OutboxComponent implements OnInit {

  messages!: any[]

  constructor (private readonly acs: AdminCommService, private toolbar: ToolbarService, private router: Router, private route: ActivatedRoute ) {
    this.toolbar.comp = this
    this.toolbar.menu = [
      { title: "Powiadomienia", fn: "goBack", icon: "arrow_back" }
    ]
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnInit(): void {
    this.acs.notif.outbox.getSent().subscribe((v) => {
      this.messages = v.map(i => {
        return {
          ...i, 
          sentDate: moment(i.sentDate)
        }
      })
    })
  }

}
