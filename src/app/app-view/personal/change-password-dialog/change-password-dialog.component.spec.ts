import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChangePasswordDialogComponent } from './change-password-dialog.component'
import { AuthClient } from 'src/app/services/auth.client'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent
  let fixture: ComponentFixture<ChangePasswordDialogComponent>

  beforeEach(() => {
    const authMock = jasmine.createSpyObj('AuthClient', ['chpass'])
    TestBed.configureTestingModule({
      declarations: [ChangePasswordDialogComponent],
      providers: [
        { provide: AuthClient, useValue: authMock },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    })
    fixture = TestBed.createComponent(ChangePasswordDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
