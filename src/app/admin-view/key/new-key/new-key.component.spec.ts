import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewKeyComponent } from './new-key.component'
import { AdminCommService } from '../../admin-comm.service'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { Component, forwardRef, Optional, Self } from '@angular/core'
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
  value: null = null
  stateChanges: Observable<void> = of()
  id: string = ''
  placeholder: string = ''
  ngControl: NgControl | AbstractControlDirective | null = null
  focused: boolean = false
  empty: boolean = true
  shouldLabelFloat: boolean = true
  required: boolean = false
  disabled: boolean = false
  errorState: boolean = false
  controlType?: string | undefined
  autofilled?: boolean | undefined
  userAriaDescribedBy?: string | undefined
  setDescribedByIds(ids: string[]): void {}
  onContainerClick(event: MouseEvent): void {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

describe('NewKeyComponent', () => {
  let component: NewKeyComponent
  let fixture: ComponentFixture<NewKeyComponent>
  let acMock

  beforeEach(async () => {
    acMock = {
      keys: {
        avalKeys: jasmine.createSpy('avalKeys').and.returnValue(of()),
      },
    }
    await TestBed.configureTestingModule({
      declarations: [NewKeyComponent, UserSearchStub],
      providers: [
        { provide: AdminCommService, useValue: acMock },
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
