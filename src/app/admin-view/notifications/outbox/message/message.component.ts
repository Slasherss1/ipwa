import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { AdminCommService } from 'src/app/admin-view/admin-comm.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss',
    standalone: false
})
export class MessageComponent {
  @Input() item!: {_id: string, sentDate: DateTime, title: string}
  body?: string
  rcpts?: {_id: string, uname: string, room?: string, fname?: string, surname?: string}[]
  loading: boolean = false
  constructor (readonly acu: AdminCommService) {}

  getMessage() {
    this.loading = true
    this.acu.notif.outbox.getBody(this.item._id).subscribe(v => {
      this.body = v
      this.loading = false
    })
  }

  getRcpts() {
    this.loading = true
    this.acu.notif.outbox.getRcpts(this.item._id).subscribe(v => {
      this.rcpts = v
      this.loading = false
    })
  }
}
