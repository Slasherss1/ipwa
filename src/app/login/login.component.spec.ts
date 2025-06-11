import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { AuthClient } from '../services/auth.client'
import { of } from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let authMock: AuthClient

  beforeEach(async () => {
    authMock = jasmine.createSpyObj<AuthClient>('AuthClient', {
      login: of(),
    })
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthClient, useValue: authMock }],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
