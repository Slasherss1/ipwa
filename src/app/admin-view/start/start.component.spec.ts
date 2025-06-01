import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAdminComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartAdminComponent;
  let fixture: ComponentFixture<StartAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
