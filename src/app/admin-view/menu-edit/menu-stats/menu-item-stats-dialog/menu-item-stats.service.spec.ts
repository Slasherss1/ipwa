import { TestBed } from '@angular/core/testing';

import { MenuItemStatsService } from './menu-item-stats.service';

describe('MenuItemStatsService', () => {
  let service: MenuItemStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
