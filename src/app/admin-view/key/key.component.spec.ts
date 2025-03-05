import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKeyComponent } from './key.component';

describe('KeyComponent', () => {
  let component: AdminKeyComponent;
  let fixture: ComponentFixture<AdminKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
