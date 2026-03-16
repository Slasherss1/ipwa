import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStatsComponent } from './menu-stats.component';

describe('MenuStatsComponent', () => {
  let component: MenuStatsComponent;
  let fixture: ComponentFixture<MenuStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
