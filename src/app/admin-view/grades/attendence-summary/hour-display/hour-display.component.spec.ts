import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourDisplayComponent } from './hour-display.component';

describe('HourDisplayComponent', () => {
  let component: HourDisplayComponent;
  let fixture: ComponentFixture<HourDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
