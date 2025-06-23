import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateSelectorComponent } from './date-selector.component'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter'
import { DateTime } from 'luxon'

describe('DateSelectorComponent', () => {
  let component: DateSelectorComponent
  let fixture: ComponentFixture<DateSelectorComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateSelectorComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [provideLuxonDateAdapter()],
    })
    fixture = TestBed.createComponent(DateSelectorComponent)
    component = fixture.componentInstance
  })

  it('should create', async () => {
    fixture.componentRef.setInput("date", DateTime.now())
    fixture.detectChanges()
    await fixture.whenStable()
    expect(component).toBeTruthy()
  })
})
