import { Component, inject, Input } from '@angular/core'
import { NotificationsService } from '../../notifications.service';
import { Message } from '../../notifications.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  standalone: false,
})
export class MessageComponent {
  protected acu = inject(NotificationsService)

  @Input() item!: Message

  getMessage() {
    this.acu.getMessageBody(this.item._id)
  }

  getRcpts() {
    this.acu.getMessageRcpts(this.item._id)
  }
}
