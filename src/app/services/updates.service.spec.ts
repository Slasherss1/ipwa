import { TestBed } from '@angular/core/testing'

import { UpdatesService } from './updates.service'
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing'
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { firstValueFrom } from 'rxjs'

describe('UpdatesService', () => {
  let service: UpdatesService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(UpdatesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should grab news', () => {
    const res = firstValueFrom(service.getNews())
    const req = httpTestingController.expectOne(environment.apiEndpoint+`/app/news`)

    expect(res).withContext("empty news array").toBeDefined()

    req.flush([])
    httpTestingController.verify()
  })
})
