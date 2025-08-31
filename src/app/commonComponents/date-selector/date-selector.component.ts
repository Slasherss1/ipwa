import {
  Component,
  Input,
  model,
  OnChanges,
  OnInit,
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
export class DateSelectorComponent implements OnChanges, OnInit {
  date = model.required<DateTime>()
  @Input() filter: DateFilterFn<DateTime | null> = () => true
  protected dateInput: FormControl<DateTime>

  constructor() {
    this.dateInput = new FormControl()
    this.dateInput.valueChanges.subscribe(v => {
      this.date.set(v)
    })
  }

  ngOnInit(): void {
    this.dateInput.setValue(this.date())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.dateInput.setValue(this.date()!, { emitEvent: false })
    }
  }

  prevDay(): void {
    const yesterday = this.date()!.minus({ day: 1 })
    if (this.filter(yesterday)) {
      this.dateInput.setValue(yesterday)
    } else {
      this.dateInput.setValue(this.date()!.set({ weekday: 5 }).minus({ week: 1 }))
    }
  }

  nextDay(): void {
    const tomorrow = this.date()!.plus({ day: 1 })
    if (this.filter(tomorrow)) {
      this.dateInput.setValue(tomorrow)
    } else {
      this.dateInput.setValue(this.date()!.set({ weekday: 1 }).plus({ week: 1 }))
    }
  }
}
