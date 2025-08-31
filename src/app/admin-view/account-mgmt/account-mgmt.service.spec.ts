import { TestBed } from '@angular/core/testing';

import { AccountMgmtService } from './account-mgmt.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { skip } from 'rxjs';

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
    const req = httpTesting.expectOne(environment.apiEndpoint + "/admin/accs", "Request to load all users")

    expect(req.request.method).toBe("GET")

    req.flush([])
    httpTesting.verify()
  })

  describe('create user', () => {
    xit('should create a user account and refresh list', () => {
      const test_user = {
        uname: "test",
        groups: []
      }
      service.postAcc(test_user).subscribe(v => {
        expect(v).toEqual(jasmine.objectContaining(test_user))
      })
      const req = httpTesting.expectOne(environment.apiEndpoint + "/admin/accs", "Request new user")

      expect(req.request.method).toBe("POST")

      req.flush({
        ...test_user,
        _id: "test_id"
      })

      const req2 = httpTesting.expectOne(environment.apiEndpoint + "/admin/accs", "Request to load all users")

      expect(req2.request.method).toBe("GET")

      // service.accs.pipe(skip(1)).subscribe(v => {
      //   expect(v).toContain(createdUser)
      // })


      req2.flush([
        {
          ...test_user,
          _id: "test_id"
        }
      ])
      httpTesting.verify()
    })
  })

  describe("delete user", () => {
    it('should refresh accounts and not to contain deleted user', async () => {
      service.deleteAcc("test").subscribe()
      const req = httpTesting.expectOne(environment.apiEndpoint + "/admin/accs/test", "Request delete user")

      expect(req.request.method).toBe("DELETE")

      req.flush({ status: 200 })

      const req2 = httpTesting.expectOne(environment.apiEndpoint + "/admin/accs", "Request to load all users")

      expect(req2.request.method).toBe("GET")
      service.accs.pipe(skip(1)).subscribe(v => {
        expect(v).not.toContain(jasmine.objectContaining({ _id: "test" }))
      })

      req2.flush([])

      httpTesting.verify()
    })
  })
});
