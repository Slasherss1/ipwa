import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalComponent } from './personal.component';
import { AuthClient } from 'src/app/services/auth.client';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppUpdateService } from 'src/app/services/app-update.service';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;
  let auMock: jasmine.SpyObj<AppUpdateService>

  beforeEach(() => {
    auMock = jasmine.createSpyObj("aumock", {
      checkForUpdate: of()
    })
    const authMock = jasmine.createSpyObj('AuthClient', ['s'])
    TestBed.configureTestingModule({
      declarations: [PersonalComponent],
      providers: [
        {provide: AuthClient, useValue: authMock},
        {provide: AppUpdateService, useValue: auMock}
      ],
      imports: [MatDialogModule, MatSnackBarModule, MatListModule, NoopAnimationsModule, MatIconModule]
    });
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
