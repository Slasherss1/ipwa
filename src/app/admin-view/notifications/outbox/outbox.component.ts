import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ToolbarService } from '../../toolbar/toolbar.service'
import { DateTime } from 'luxon'
import { NotificationsService } from '../notifications.service'

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.scss',
  standalone: false,
})
export class OutboxComponent implements OnInit {
  messages!: {
    _id: string
    sentDate: DateTime
    title: string
  }[]

  constructor(
    private acs: NotificationsService,
    private toolbar: ToolbarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.toolbar.comp = this
    this.toolbar.menu = [
      { title: 'Powiadomienia', fn: 'goBack', icon: 'arrow_back' },
    ]
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.acs.outbox.getSent().subscribe(v => {
      this.messages = v
    })
  }
}
