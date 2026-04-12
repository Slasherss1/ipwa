import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarControlComponent } from './star-control.component';

describe('StarControlComponent', () => {
  let component: StarControlComponent;
  let fixture: ComponentFixture<StarControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
