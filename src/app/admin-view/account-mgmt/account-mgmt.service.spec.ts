import { TestBed } from '@angular/core/testing';

import { AccountMgmtService } from './account-mgmt.service';

xdescribe('AccountMgmtService', () => {
  let service: AccountMgmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountMgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
