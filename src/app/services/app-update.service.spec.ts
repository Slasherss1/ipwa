import { TestBed } from '@angular/core/testing';

import { AppUpdateService } from './app-update.service';

describe('AppUpdateService', () => {
  let service: AppUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUpdateService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
