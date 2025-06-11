import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AttendenceComponent } from './attendence.component'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { AdminCommService } from '../../admin-comm.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import { of } from 'rxjs'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('AttendenceComponent', () => {
  let component: AttendenceComponent
  let fixture: ComponentFixture<AttendenceComponent>

  beforeEach(async () => {
    const acMock = {
      clean: {
        attendence: {
          getUsers: jasmine.createSpy('getUsers').and.returnValue(of()),
        },
      },
    }
    await TestBed.configureTestingModule({
      declarations: [AttendenceComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AdminCommService, useValue: acMock },
      ],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AttendenceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
