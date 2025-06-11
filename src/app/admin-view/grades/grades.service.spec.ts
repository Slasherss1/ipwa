import { TestBed } from '@angular/core/testing';

import { GradesService } from './grades.service';

xdescribe('GradesService', () => {
  let service: GradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
