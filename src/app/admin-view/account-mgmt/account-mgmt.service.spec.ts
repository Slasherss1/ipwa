import { TestBed } from '@angular/core/testing';

import { AccountMgmtService } from './account-mgmt.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AccountMgmtService', () => {
  let service: AccountMgmtService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountMgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user accounts', () => {
    service.refresh()
    const req = httpTesting.expectOne(environment.apiEndpoint+"/admin/accs", "Request to load all users")

    expect(req.request.method).toBe("GET")

    req.flush([])
    httpTesting.verify()
  })

  it('should create a user account and refresh list', () => {
    service.postAcc({
      uname: "test",
      groups: []
    })
  })
});
