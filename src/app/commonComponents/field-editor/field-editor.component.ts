import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-field-editor',
  templateUrl: './field-editor.component.html',
  styleUrl: './field-editor.component.scss'
})
export class FieldEditorComponent {
  @HostBinding('tabindex') tabindex = 0;
  @Input() word!: string;
  @Output() wordChange = new EventEmitter<string>();
  @Input() category!: string;
  @Input() list?: string;

  constructor (private elRef: ElementRef) { }

  focused = false;

  @HostListener('click') focusin() {
    if (!this.focused) {
      console.log("in");
      this.focused = true
    }
  }

  @HostListener('focusout') focusout() {
    console.log("out");
  }

  save(event: Event,v: string) {
    this.wordChange.emit(v)
    this.elRef.nativeElement.blur()
    this.focused = false
    event.stopPropagation()
  }

  cancel(event: Event) {
    this.elRef.nativeElement.blur()
    this.focused = false
    event.stopPropagation()
  }
}
