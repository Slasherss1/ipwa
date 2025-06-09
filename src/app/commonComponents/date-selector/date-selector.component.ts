import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnChanges {
  @Input() date: moment.Moment = moment.utc().startOf('day');
  @Output() dateChange = new EventEmitter<moment.Moment>();
  @Input() filter: (date: moment.Moment | null) => boolean = () => true
  protected dateInput: FormControl<moment.Moment>

  constructor () {
    this.dateInput = new FormControl(this.date, {nonNullable: true});
    this.dateInput.valueChanges.subscribe((v) => {
      v.utc(true).startOf('day')
      this.dateChange.emit(v)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.dateInput.setValue(this.date, {emitEvent: false})
    }
  }
  
  prevDay(): void {
    let newDay = moment(this.date);
    if (this.filter(newDay.add({days: -1}))) {
      this.dateInput.setValue(this.date.add({days: -1}))
    } else {
      this.dateInput.setValue(this.date.isoWeekday(-2))
    }
  }

  nextDay(): void {
    let newDay = moment(this.date);
    if (this.filter(newDay.add({days: 1}))) {
      this.dateInput.setValue(this.date.add({days: 1}))
    } else {
      this.dateInput.setValue(this.date.isoWeekday(8))
    }
  }
}
