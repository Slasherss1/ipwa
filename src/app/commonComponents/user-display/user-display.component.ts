import { Component, computed, input } from '@angular/core';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-user-display',
  standalone: false,
  templateUrl: './user-display.component.html',
  styleUrl: './user-display.component.scss'
})
export class UserDisplayComponent {
  item = input.required<User>()
  uname = computed(() => this.item().uname)
  fname = computed(() => this.item().fname)
  surname = computed(() => this.item().surname)
  room = computed(() => this.item().room)
}
