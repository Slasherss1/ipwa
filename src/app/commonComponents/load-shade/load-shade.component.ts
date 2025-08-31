import { Component, input, output } from '@angular/core';
import { STATE } from 'src/app/types/state';

@Component({
  selector: 'app-load-shade',
  standalone: false,
  templateUrl: './load-shade.component.html',
  styleUrl: './load-shade.component.scss',
})
export class LoadShadeComponent {
  state = input(STATE.NOT_LOADED)
  error = input<string | undefined>(undefined)
  refresh = output<void>()

  public get STATE(): typeof STATE {
    return STATE
  }
}
