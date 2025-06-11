import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatInputHarness } from '@angular/material/input/testing'
import { RedirectComponent } from './redirect.component'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { AuthClient } from 'src/app/services/auth.client'
import { MatFormFieldModule } from '@angular/material/form-field'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('RedirectComponent', () => {
  let component: RedirectComponent
  let fixture: ComponentFixture<RedirectComponent>
  let loader: HarnessLoader
  let authMock

  beforeEach(async () => {
    authMock = jasmine.createSpyObj<AuthClient>(
      'AuthClient',
      {},
      { redirect: '' }
    )
    await TestBed.configureTestingModule({
      declarations: [RedirectComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthClient, useValue: authMock },
      ],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RedirectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    loader = TestbedHarnessEnvironment.loader(fixture)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
