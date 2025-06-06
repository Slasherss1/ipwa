import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetComponent } from './user-reset.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserResetComponent', () => {
  let component: UserResetComponent;
  let fixture: ComponentFixture<UserResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserResetComponent],
      imports: [
        MatDialogModule
      ]
    });
    fixture = TestBed.createComponent(UserResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
