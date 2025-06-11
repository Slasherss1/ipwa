import { TestBed } from '@angular/core/testing';

import { GradesService } from './grades.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('GradesService', () => {
  let service: GradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(GradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
