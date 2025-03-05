import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appCe] [contenteditable]'
})
export class CeDirective {
  @Input() multiline: boolean = false
  @Output() edit = new EventEmitter<string | string[]>()
  private originalValue: string | ChildNode[]

  constructor(readonly el: ElementRef<HTMLElement>) {
    this.originalValue = el.nativeElement.innerText
  }

  @HostListener("focusin") focusin() {
    this.originalValue = this.el.nativeElement.innerText
  }

  @HostListener("focusout") focusout() {
    var newText = this.el.nativeElement.innerText
    if (newText != this.originalValue) {
      this.edit.emit(newText)
    }
  }

  @HostListener('keydown', ['$event']) keyup(e: KeyboardEvent) {
    if (this.multiline) return
    if (e.key == "Enter") {
      e.preventDefault()
      this.el.nativeElement.blur()
    }
  }
}