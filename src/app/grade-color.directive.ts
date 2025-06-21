import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: 'span[appGradeColor]',
  standalone: false
})
export class GradeColorDirective {

  appGradeColor = input<number>()

  @HostBinding("style")
  get gc() {
    switch (this.appGradeColor()) {
      case 1:
        return { color: 'red' }
      case 2:
        return { color: 'darkorange' }
      case 3:
        return { color: 'orange' }
      case 4:
        return { color: 'olive' }
      case 5:
        return { color: 'green' }
      case 6:
        return { color: 'springgreen' }
      default:
        return { color: 'inherit' }
    }
  }

}
