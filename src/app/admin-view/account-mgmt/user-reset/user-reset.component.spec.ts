import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetComponent } from './user-reset.component';

describe('UserResetComponent', () => {
  let component: UserResetComponent;
  let fixture: ComponentFixture<UserResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserResetComponent]
    });
    fixture = TestBed.createComponent(UserResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
