import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesComponent } from './grades.component';
import { AdminCommService } from '../admin-comm.service';
import { RouterModule } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({selector: "app-date-selector", template: ''})
class DateSelectorStub {
    @Input() date: moment.Moment = moment.utc().startOf('day');
    @Output() dateChange = new EventEmitter<moment.Moment>();
    @Input() filter: (date: moment.Moment | null) => boolean = () => true
}

@Component({selector: "app-room-chooser", template: ''})
class RoomSelectorStub {
  @Input() rooms: string[] = []
  @Output() room: EventEmitter<string> = new EventEmitter<string>();
}

describe('GradesComponent', () => {
  let component: GradesComponent;
  let fixture: ComponentFixture<GradesComponent>;
  let acMock

  beforeEach(async () => {
    acMock = {
      clean: {
        getConfig: jasmine.createSpy("getConfig").and.returnValue(of())
      }
    }
    await TestBed.configureTestingModule({
      declarations: [GradesComponent, DateSelectorStub, RoomSelectorStub],
      providers: [
        {provide: AdminCommService, useValue: acMock}
      ],
      imports: [
        RouterModule.forRoot([]),
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
