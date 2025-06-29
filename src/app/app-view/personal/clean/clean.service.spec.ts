import { TestBed } from '@angular/core/testing';

import { CleanService } from './clean.service';

xdescribe('CleanService', () => {
  let service: CleanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
