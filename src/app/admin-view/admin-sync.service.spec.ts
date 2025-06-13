import { TestBed } from '@angular/core/testing';

import { AdminSyncService } from './admin-sync.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdminSyncService', () => {
  let service: AdminSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AdminSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
