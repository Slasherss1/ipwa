import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { AdminCommService } from 'src/app/admin-view/admin-comm.service';

interface UserSearchResult {
  _id: string;
  fname: string;
  surname: string;
  uname: string;
  room: string;
}

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSearchComponent),
      multi: true
    }
  ],
  host: {
    '(blur)': '_onTouched()'
  }
})
export class UserSearchComponent implements ControlValueAccessor {
  protected loading: boolean = false
  @Input() label?: boolean
  control: FormControl = new FormControl();
  protected list: UserSearchResult[] = []
  private timeout?: NodeJS.Timeout
  private _onChange!: (_: UserSearchResult) => void
  private _onTouched!: any

  constructor(readonly acu: AdminCommService) {
    this.control.valueChanges.subscribe(() => {
      this.loading = true
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.acu.userFilter(this.control.value).subscribe(v => {
          this.list = v
          this.loading = false
        })
      }, 500)
    })
  }

  writeValue(obj: string): void {
    this.control.setValue(obj)
  }

  registerOnChange(fn: (_: UserSearchResult) => void): void {
    this._onChange = fn
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable()
  }

  protected displayFn(u: UserSearchResult): string {
    if (!u) return ''
    return u.fname ? `${u.fname} ${u.surname}` : u.uname
  }

  protected saveValue(e: MatAutocompleteSelectedEvent) {
    this._onChange(this.control.value)
  }
}
