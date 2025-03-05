import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { UpdatesService } from 'src/app/services/updates.service';
import { DateSelectorComponent } from '../../commonComponents/date-selector/date-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    const updatesSpy = jasmine.createSpyObj('UpdatesService', ['getMenu'])
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent, DateSelectorComponent],
      providers: [
        {provide: UpdatesService, useValue: updatesSpy},
        {provide: DateAdapter, useClass: MomentDateAdapter},
        {provide: MAT_DATE_LOCALE, useValue: "pl-PL"},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}, 
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
      ],
      imports: [MatIconModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule, MatBottomSheetModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
