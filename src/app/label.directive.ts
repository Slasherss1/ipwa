import { Directive, HostBinding, inject, Input } from '@angular/core'
import { ControlContainer } from '@angular/forms'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'span[control]',
  standalone: false,
})
export class LabelDirective {
  private parent? = inject(ControlContainer, {optional: true})

  @Input() control = ''

  @HostBinding('textContent')
  get controlValue() {
    return this.parent ? this.parent.control?.get(this.control)?.value : ''
  }
}
