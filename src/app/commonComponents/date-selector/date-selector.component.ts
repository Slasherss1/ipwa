import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { DateFilterFn } from '@angular/material/datepicker'
import { DateTime } from 'luxon'

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  standalone: false,
})
export class DateSelectorComponent implements OnChanges {
  protected _date_1: DateTime = DateTime.now()
  protected set _date(value: DateTime) {
    this._date_1 = value
    this.date = value.toISODate()!
  }
  @Input()
  public set date(value: string) {
    this._date_1 = DateTime.fromISO(value)
  }
  @Output() dateChange = new EventEmitter<string>()
  @Input() filter: DateFilterFn<DateTime | null> = () => true
  protected dateInput: FormControl<DateTime>

  constructor() {
    this.dateInput = new FormControl(this._date_1, { nonNullable: true })
    this.dateInput.valueChanges.subscribe(v => {
      this.dateChange.emit(v.toISODate()!)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.dateInput.setValue(this._date_1), { emitEvent: false }
    }
  }

  prevDay(): void {
    let yesterday = this._date_1.minus({ day: 1 })
    if (this.filter(yesterday)) {
      this.dateInput.setValue(yesterday)
    } else {
      this.dateInput.setValue(this._date.set({ weekday: 5 }).minus({ week: 1 }))
    }
  }

  nextDay(): void {
    let tomorrow = this._date_1.plus({ day: 1 })
    if (this.filter(tomorrow)) {
      this.dateInput.setValue(tomorrow)
    } else {
      this.dateInput.setValue(this._date.set({ weekday: 1 }).plus({ week: 1 }))
    }
  }
}
