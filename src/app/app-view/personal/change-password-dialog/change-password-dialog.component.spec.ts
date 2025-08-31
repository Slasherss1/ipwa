import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChangePasswordDialogComponent } from './change-password-dialog.component'
import { AuthClient } from 'src/app/services/auth.client'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatFormFieldHarness } from "@angular/material/form-field/testing";
import { MatInputHarness } from "@angular/material/input/testing"
import { of } from 'rxjs'

describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent
  let fixture: ComponentFixture<ChangePasswordDialogComponent>
  let loader: HarnessLoader
  let authClientSpy: jasmine.SpyObj<AuthClient>

  beforeEach(() => {
    const authMock = jasmine.createSpyObj('AuthClient', {
      chpass: of(undefined)
    })
    const drMock = jasmine.createSpyObj("DialogRef", ["close"])
    TestBed.configureTestingModule({
      declarations: [ChangePasswordDialogComponent],
      providers: [
        { provide: AuthClient, useValue: authMock },
        { provide: MatDialogRef, useValue: drMock },
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
    loader = TestbedHarnessEnvironment.loader(fixture)
    authClientSpy = TestBed.inject(AuthClient) as jasmine.SpyObj<AuthClient>
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should be able to get a form fields', async () => {
    const formFields = await loader.getAllHarnesses(MatFormFieldHarness)
    expect(formFields.length).withContext("form fields").toBe(3)
  })

  xdescribe("form submit events", () => {
    it('should submit when there are no form errors', async () => {
      const formFields = await loader.getAllHarnesses(MatFormFieldHarness);
      formFields.forEach(async element => {
        const control = await element.getControl() as MatInputHarness
        await control.setValue("test")
      });
      component.changePass()
      expect(authClientSpy.chpass).toHaveBeenCalled()
    })

    it('should not submit if there are form errors', async () => {
      // const formFields = await loader.getAllHarnesses(MatFormFieldHarness);
      // formFields.forEach(async element => {
      //   (await element.getControl() as MatInputHarness).setValue("test")
      // });
      // component.changePass()
      await fixture.whenStable()
      expect(component.changePass).toThrowError("Form invalid")
    })
  })

})
