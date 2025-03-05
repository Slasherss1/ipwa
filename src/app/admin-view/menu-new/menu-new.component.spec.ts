import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNewComponent } from './menu-new.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_RANGE_SELECTION_STRATEGY, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FDSelection } from 'src/app/fd.da';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCommService } from '../admin-comm.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('MenuNewComponent', () => {
  let component: MenuNewComponent;
  let fixture: ComponentFixture<MenuNewComponent>;

  beforeEach(() => {
    const acMock = jasmine.createSpyObj('AdminCommService', {
      getMenu: of()
    })
    TestBed.configureTestingModule({
      declarations: [MenuNewComponent],
      imports: [MatTableModule, MatInputModule, MatDatepickerModule, BrowserAnimationsModule, ReactiveFormsModule, MatDialogModule, MatIconModule],
      providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter},
        {provide: MAT_DATE_LOCALE, useValue: "pl-PL"},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}, 
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
        {provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: FDSelection},
        {provide: AdminCommService, useValue: acMock}
      ],
    });
    fixture = TestBed.createComponent(MenuNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
