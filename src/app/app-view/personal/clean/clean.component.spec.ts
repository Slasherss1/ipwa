import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanComponent } from './clean.component';
import { UpdatesService } from 'src/app/services/updates.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepicker } from '@angular/material/datepicker';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: "app-date-selector", template: '',
    standalone: false
})
class DateSelectorStub {
    @Input() date: moment.Moment = moment.utc().startOf('day');
    @Output() dateChange = new EventEmitter<moment.Moment>();
    @Input() filter: (date: moment.Moment | null) => boolean = () => true
}

describe('CleanComponent', () => {
  let component: CleanComponent;
  let fixture: ComponentFixture<CleanComponent>;
  let updates: jasmine.SpyObj<UpdatesService>

  beforeEach(async () => {
    updates = jasmine.createSpyObj<UpdatesService>("UpdatesService", {
      getClean: of()
    })
    await TestBed.configureTestingModule({
      declarations: [CleanComponent, DateSelectorStub],
      providers: [
        {provide: UpdatesService, useValue: updates}
      ],
      imports: [MatDialogModule, MatIconModule, MatFormFieldModule, MatDatepicker]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
