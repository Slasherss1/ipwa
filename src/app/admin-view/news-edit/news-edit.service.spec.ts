import { TestBed } from '@angular/core/testing';

import { NewsEditService } from './news-edit.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NewsEditService', () => {
  let service: NewsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(NewsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
