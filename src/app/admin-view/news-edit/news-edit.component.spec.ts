import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditComponent } from './news-edit.component';
import { AdminCommService } from '../admin-comm.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('NewsEditComponent', () => {
  let component: NewsEditComponent;
  let fixture: ComponentFixture<NewsEditComponent>;

  beforeEach(() => {
    const acMock = jasmine.createSpyObj('AdminCommService', {
      getNews: of()
    })
    TestBed.configureTestingModule({
      declarations: [NewsEditComponent],
      providers: [
        {provide: AdminCommService, useValue: acMock}
      ],
      imports: [MatDialogModule, MatSnackBarModule]
    });
    fixture = TestBed.createComponent(NewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
