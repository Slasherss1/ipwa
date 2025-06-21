import { TestBed } from '@angular/core/testing'

import { AuthClient } from './auth.client'
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing'

describe('AuthService', () => {
  let service: AuthClient
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
    service = TestBed.inject(AuthClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
