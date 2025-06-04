import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { AdminCommService } from '../admin-comm.service';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { Component, forwardRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { AbstractControlDirective, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: "app-user-search", template: '', providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UserSearchStub),
    multi: true,
  },
  {
    provide: MatFormFieldControl,
    useExisting: UserSearchStub
  }]
})
class UserSearchStub implements ControlValueAccessor, MatFormFieldControl<never> {
  value: null = null;
  stateChanges: Observable<void> = of();
  id: string = "";
  placeholder: string = "";
  ngControl: NgControl | AbstractControlDirective | null = null;
  focused: boolean = false;
  empty: boolean = true;
  shouldLabelFloat: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  errorState: boolean = false;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  setDescribedByIds(ids: string[]): void {}
  onContainerClick(event: MouseEvent): void {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(() => {
    const acMock = {
      notif: {
        getGroups: jasmine.createSpy("getGroups").and.returnValue(of())
      }
    }
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent, UserSearchStub],
      providers: [
        {provide: AdminCommService, useValue: acMock}
      ],
      imports: [
        RouterModule.forRoot([]),
        MatRadioModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
