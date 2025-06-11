import { TestBed } from '@angular/core/testing';

import { NewsEditService } from './news-edit.service';

xdescribe('NewsEditService', () => {
  let service: NewsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
