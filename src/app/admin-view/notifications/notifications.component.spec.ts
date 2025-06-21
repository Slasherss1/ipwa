import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NotificationsComponent } from './notifications.component'
import { RouterModule } from '@angular/router'
import { MatRadioModule } from '@angular/material/radio'
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field'
import { Component, forwardRef } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Observable, of } from 'rxjs'
import {
  AbstractControlDirective,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NotificationsService } from './notifications.service'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setDescribedByIds(ids: string[]): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onContainerClick(event: MouseEvent): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  writeValue(obj: unknown): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnChange(fn: unknown): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(fn: unknown): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setDisabledState?(isDisabled: boolean): void {}
}

xdescribe('NotificationsComponent', () => {
  let component: NotificationsComponent
  let fixture: ComponentFixture<NotificationsComponent>

  beforeEach(() => {
    const acMock = {}
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent, UserSearchStub],
      providers: [{ provide: NotificationsService, useValue: acMock }],
      imports: [
        RouterModule.forRoot([]),
        MatRadioModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    })
    fixture = TestBed.createComponent(NotificationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
