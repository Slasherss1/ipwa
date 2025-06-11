import { Directive, HostBinding, Input, Optional } from '@angular/core'
import { ControlContainer } from '@angular/forms'

@Directive({
  selector: 'span[control]',
  standalone: false,
})
export class LabelDirective {
  @Input() control: string = ''
  constructor(@Optional() private parent?: ControlContainer) {}

  @HostBinding('textContent')
  get controlValue() {
    return this.parent ? this.parent.control?.get(this.control)?.value : ''
  }
}
