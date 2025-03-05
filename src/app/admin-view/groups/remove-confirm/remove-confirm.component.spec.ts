import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConfirmComponent } from './remove-confirm.component';

describe('RemoveConfirmComponent', () => {
  let component: RemoveConfirmComponent;
  let fixture: ComponentFixture<RemoveConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveConfirmComponent]
    });
    fixture = TestBed.createComponent(RemoveConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
