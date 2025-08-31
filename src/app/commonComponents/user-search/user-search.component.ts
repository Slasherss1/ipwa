import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion'
import { HttpClient } from '@angular/common/http'
import {
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatFormFieldControl } from '@angular/material/form-field'
import { debounceTime, filter, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'

export interface UserSearchResult {
  _id: string
  fname: string
  surname: string
  uname: string
  room: string
}

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: UserSearchComponent,
    },
  ],
  host: {
    '(blur)': '_onTouched()',
  },
  standalone: false,
})
export class UserSearchComponent
  implements
  ControlValueAccessor,
  MatFormFieldControl<UserSearchResult>,
  OnDestroy,
  DoCheck {
  public ngControl = inject(NgControl, { optional: true, self: true })
  private _parentForm = inject(NgForm, { optional: true })
  private _parentFormGroup = inject(FormGroupDirective, { optional: true })
  private _elementRef = inject(ElementRef)
  private http = inject(HttpClient)
  protected loading = false
  control: FormControl = new FormControl<UserSearchResult | string>("")
  protected list: UserSearchResult[] = []
  private _onChange!: (_: UserSearchResult) => void
  private _onTouched!: () => void

  static nextId = 0

  @Input()
  public get value(): UserSearchResult | null {
    return this.control.value
  }

  public set value(value: UserSearchResult | null) {
    this.control.setValue(value)
    this.stateChanges.next()
  }

  touched = false

  stateChanges = new Subject<void>()

  @HostBinding() id = `app-user-search-${UserSearchComponent.nextId++}`

  private _placeholder = ''
  @Input()
  public get placeholder(): string {
    return this._placeholder
  }
  public set placeholder(value: string) {
    this._placeholder = value
    this.stateChanges.next()
  }

  focused = false
  onFocusIn() {
    if (!this.focused) {
      this.focused = true
      this.stateChanges.next()
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true
      this.focused = false
      this._onTouched()
      this.stateChanges.next()
    }
  }
  get empty(): boolean {
    return !this.control.value
  }
  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty
  }
  private _required = false
  @Input()
  public get required(): boolean {
    return this._required
  }

  public set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value)
    this.stateChanges.next()
  }

  private _disabled = false
  @Input()
  public get disabled(): boolean {
    return this._disabled
  }
  public set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this._disabled ? this.control.disable() : this.control.enable()
    this.stateChanges.next()
  }
  errorState = false
  controlType?: string | undefined = 'app-user-search'
  autofilled?: boolean | undefined
  @Input() 'aria-describedby'?: string
  setDescribedByIds(ids: string[]): void {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.app-user-search-container'
    )!
    controlElement.setAttribute('aria-describedby', ids.join(' '))
  }
  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus()
    }
  }

  constructor() {
    if (this.ngControl != null) {
      ; (this.ngControl as NgControl).valueAccessor = this
    }
    this.control.valueChanges.pipe(debounceTime(500), filter(v => typeof v == "string")).subscribe(v => {
      this.loading = true
      this.http.get<UserSearchResult[]>(environment.apiEndpoint + `/admin/usearch`, {
        params: { q: v },
        withCredentials: true,
      }).subscribe(v => {
        this.list = v
        this.loading = false
      })
    })
  }
  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState()
    }
  }
  private updateErrorState() {
    const parent = this._parentFormGroup || this._parentForm

    const oldState = this.errorState
    const newState =
      (this.ngControl?.invalid || this.control.invalid) &&
      (this.touched || parent?.submitted)

    if (oldState !== newState) {
      this.errorState = !!newState
      this.stateChanges.next()
    }
  }
  ngOnDestroy(): void {
    this.stateChanges.complete()
  }

  writeValue(obj: UserSearchResult): void {
    this.value = obj
  }

  registerOnChange(fn: (_: UserSearchResult) => void): void {
    this._onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  protected displayFn(u: UserSearchResult): string {
    if (!u) return ''
    return u.fname ? `${u.fname} ${u.surname}` : u.uname
  }

  protected saveValue(e: MatAutocompleteSelectedEvent) {
    this.autofilled = true
    this.value = e.option.value
    this._onChange(this.value!)
  }
}
