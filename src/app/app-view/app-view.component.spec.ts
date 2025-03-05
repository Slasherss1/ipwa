import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewComponent } from './app-view.component';
import { AuthClient } from '../services/auth.client';
import { SwPush } from '@angular/service-worker';
import { UpdatesService } from '../services/updates.service';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('AppViewComponent', () => {
  let component: AppViewComponent;
  let fixture: ComponentFixture<AppViewComponent>;
  let authClient: jasmine.SpyObj<AuthClient>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthClient', ['check'])
    const pushSpy = jasmine.createSpyObj('SwPush', ['requestSubscription'])
    const updatesSpy = jasmine.createSpyObj('UpdatesService', ['postNotif'])
    TestBed.configureTestingModule({
      declarations: [AppViewComponent],
      providers: [{provide: AuthClient, useValue: authSpy},
      {provide: SwPush, useValue: pushSpy},
      {provide: UpdatesService, useValue: updatesSpy}],
      imports: [MatTabsModule, RouterModule.forRoot([]), MatIconModule]
    });
    fixture = TestBed.createComponent(AppViewComponent);
    component = fixture.componentInstance;
    authClient = TestBed.inject(AuthClient) as jasmine.SpyObj<AuthClient>

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
