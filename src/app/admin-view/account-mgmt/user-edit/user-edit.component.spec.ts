import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserEditComponent } from './user-edit.component'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatSelectModule } from '@angular/material/select'
import { AccountMgmtService } from '../account-mgmt.service'

xdescribe('UserEditComponent', () => {
  let component: UserEditComponent
  let fixture: ComponentFixture<UserEditComponent>
  let acMock

  beforeEach(async () => {
    acMock = {}
    await TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSelectModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { groups: [] } },
        { provide: AccountMgmtService, useValue: acMock },
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(UserEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
