import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AttendenceComponent } from './attendence.component'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { GradesService } from '../grades.service'

xdescribe('AttendenceComponent', () => {
  let component: AttendenceComponent
  let fixture: ComponentFixture<AttendenceComponent>

  beforeEach(async () => {
    const acMock = {}
    await TestBed.configureTestingModule({
      declarations: [AttendenceComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: GradesService, useValue: acMock },
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
