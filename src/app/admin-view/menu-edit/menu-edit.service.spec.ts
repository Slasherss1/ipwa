import { TestBed } from '@angular/core/testing';

import { MenuEditService } from './menu-edit.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MenuEditService', () => {
  let service: MenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
