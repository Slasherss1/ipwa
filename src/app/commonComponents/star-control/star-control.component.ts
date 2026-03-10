import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Component, ElementRef, HostBinding, inject, input, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-star-control',
  standalone: false,
  templateUrl: './star-control.component.html',
  styleUrl: './star-control.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: StarControlComponent }]
})
export class StarControlComponent implements MatFormFieldControl<number>, ControlValueAccessor {
  private _elementRef = inject(ElementRef)
  control: FormControl = new FormControl<number | null>(null)

  touched = false;

  writeValue(obj: NumberInput): void {
    this.value = coerceNumberProperty(obj);
    this.stateChanges.next();
  }
  registerOnChange(fn: (value: number | null) => void): void {
    this.control.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: () => void): void {
    this.control.registerOnChange(() => {
      this.touched = true;
      fn();
    })
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  @Input()
  public get value(): number | null {
    return this.control.value;
  }
  public set value(value: NumberInput | null) {
    this.control.setValue(coerceNumberProperty(value));
    this.stateChanges.next();
  }
  stateChanges = new Subject<void>();
  static nextId = 0;
  @HostBinding() id = `star-control-${StarControlComponent.nextId++}`;
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder = "";
  public ngControl = inject(NgControl, { optional: true, self: true });
  focused = false;
  get empty() {
    return this.value === null || this.value === undefined;
  }
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req: BooleanInput) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    this.stateChanges.next();
  }
  private _disabled = false;
  get errorState(): boolean {
    return this.control.invalid && this.touched;
  }
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;
  setDescribedByIds(ids: string[]): void {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.app-star-control-container'
    )!
    controlElement.setAttribute('aria-describedby', ids.join(' '))
  }
  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus()
    }
  }

  display = input(false, { transform: coerceBooleanProperty });

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

}
