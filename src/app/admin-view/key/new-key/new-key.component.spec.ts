import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKeyComponent } from './new-key.component';

describe('NewKeyComponent', () => {
  let component: NewKeyComponent;
  let fixture: ComponentFixture<NewKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewKeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
