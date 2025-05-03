import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceSummaryComponent } from './attendence-summary.component';

describe('AttendenceSummaryComponent', () => {
  let component: AttendenceSummaryComponent;
  let fixture: ComponentFixture<AttendenceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendenceSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendenceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
