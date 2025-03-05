import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalComponent } from './personal.component';
import { AuthClient } from 'src/app/services/auth.client';
import { MatDialogModule } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;

  beforeEach(() => {
    const authMock = jasmine.createSpyObj('AuthClient', ['s'])
    TestBed.configureTestingModule({
      declarations: [PersonalComponent],
      providers: [
        {provide: AuthClient, useValue: authMock},
      ],
      imports: [MatDialogModule, MatSnackBarModule, MatListModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
