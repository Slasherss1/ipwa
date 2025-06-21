import { Component, inject, Input } from '@angular/core'
import { DateTime } from 'luxon'
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  standalone: false,
})
export class MessageComponent {
  protected acu = inject(NotificationsService)

  @Input() item!: { _id: string; sentDate: DateTime; title: string }
  body?: string
  rcpts?: {
    _id: string
    uname: string
    room?: string
    fname?: string
    surname?: string
  }[]
  loading = false

  getMessage() {
    this.loading = true
    this.acu.outbox.getBody(this.item._id).subscribe(v => {
      this.body = v
      this.loading = false
    })
  }

  getRcpts() {
    this.loading = true
    this.acu.outbox.getRcpts(this.item._id).subscribe(v => {
      this.rcpts = v
      this.loading = false
    })
  }
}
