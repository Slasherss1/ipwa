import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemStatsDialogComponent } from './menu-item-stats-dialog.component';

describe('MenuItemStatsDialogComponent', () => {
  let component: MenuItemStatsDialogComponent;
  let fixture: ComponentFixture<MenuItemStatsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItemStatsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemStatsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
