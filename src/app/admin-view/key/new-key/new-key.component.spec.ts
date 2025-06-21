import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewKeyComponent } from './new-key.component'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { Component, forwardRef } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  AbstractControlDirective,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { KeyService } from '../key.service'

@Component({
  selector: 'app-user-search',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSearchStub),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: UserSearchStub,
    },
  ],
  standalone: false,
})
class UserSearchStub
  implements ControlValueAccessor, MatFormFieldControl<never>
{
  value = null
  stateChanges: Observable<void> = of()
  id = ''
  placeholder = ''
  ngControl: NgControl | AbstractControlDirective | null = null
  focused = false
  empty = true
  shouldLabelFloat = true
  required = false
  disabled = false
  errorState = false
  controlType?: string | undefined
  autofilled?: boolean | undefined
  userAriaDescribedBy?: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setDescribedByIds(ids: string[]): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onContainerClick(event: MouseEvent): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  writeValue(obj: unknown): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  registerOnChange(fn: unknown): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  registerOnTouched(fn: unknown): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setDisabledState?(isDisabled: boolean): void {}
}

xdescribe('NewKeyComponent', () => {
  let component: NewKeyComponent
  let fixture: ComponentFixture<NewKeyComponent>
  let acMock

  beforeEach(async () => {
    acMock = {
    }
    await TestBed.configureTestingModule({
      declarations: [NewKeyComponent, UserSearchStub],
      providers: [
        { provide: KeyService, useValue: acMock },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(NewKeyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
