import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { RouterModule } from '@angular/router';
import { AdminCommService } from '../../admin-comm.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
        { provide: MAT_DATE_LOCALE, useValue: "pl-PL" },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
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
