import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { RouterModule } from '@angular/router';
import { AdminCommService } from '../../admin-comm.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    const acMock = {
      clean: {
        summary: {
          getSummary: jasmine.createSpy("getSummary").and.returnValue(of())
        }
      }
    }
    await TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      providers: [
        { provide: AdminCommService, useValue: acMock },
        provideLuxonDateAdapter()
      ],
      imports: [
        RouterModule.forRoot([]),
        MatFormFieldModule,
        MatDatepickerModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
