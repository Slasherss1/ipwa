import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: false,
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss'
})
export class StarComponent {
  value = model<number|null>();
  i = input(0);
  disabled = input(false);
  display = input(false, {transform: coerceBooleanProperty});
}
