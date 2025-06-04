import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppUpdateService } from './services/app-update.service';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let auMock
  beforeEach(async () => {
    auMock = {}
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AppUpdateService, useValue: auMock}
      ],
      imports: [
        RouterModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Internat'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Internat');
  });
});
