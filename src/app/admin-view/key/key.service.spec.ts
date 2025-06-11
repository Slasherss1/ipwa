import { TestBed } from '@angular/core/testing';

import { KeyService } from './key.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('KeyService', () => {
  let service: KeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(KeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
