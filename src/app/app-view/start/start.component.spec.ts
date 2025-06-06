import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
      imports: [
        RouterModule.forRoot([]),
        MatListModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
