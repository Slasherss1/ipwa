import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core'

@Directive({
  selector: '[appCe] [contenteditable]',
  standalone: false,
})
export class CeDirective {
  readonly el: ElementRef<HTMLElement> = inject(ElementRef)

  @Input() multiline = false
  @Output() edit = new EventEmitter<string | string[]>()
  private originalValue: string | ChildNode[]

  constructor() {
    this.originalValue = this.el.nativeElement.innerText
  }

  @HostListener('focusin') focusin() {
    this.originalValue = this.el.nativeElement.innerText
  }

  @HostListener('focusout') focusout() {
    const newText = this.el.nativeElement.innerText
    if (newText != this.originalValue) {
      this.edit.emit(newText)
    }
  }

  @HostListener('keydown', ['$event']) keyup(e: KeyboardEvent) {
    if (this.multiline) return
    if (e.key == 'Enter') {
      e.preventDefault()
      this.el.nativeElement.blur()
    }
  }
}
