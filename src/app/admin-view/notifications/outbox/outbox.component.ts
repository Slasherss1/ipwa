import { Component, inject, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ToolbarService } from '../../toolbar/toolbar.service'
import { NotificationsService } from '../notifications.service'
import { Message } from '../notifications.model'

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.scss',
  standalone: false,
})
export class OutboxComponent implements OnInit {
  protected ns = inject(NotificationsService)
  private toolbar = inject(ToolbarService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  messages!: Message[]

  constructor() {
    this.toolbar.comp = this
    this.toolbar.menu = [
      { title: 'Powiadomienia', fn: 'goBack', icon: 'arrow_back' },
    ]
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.ns.refreshOutbox()
    this.ns.msgs.subscribe(v => {
      this.messages = v
    })
  }
}
