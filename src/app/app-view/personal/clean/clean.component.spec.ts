import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CleanComponent } from './clean.component'
import { UpdatesService } from 'src/app/services/updates.service'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepicker } from '@angular/material/datepicker'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DateTime } from 'luxon'
import { CleanService } from './clean.service'

@Component({
  selector: 'app-date-selector',
  template: '',
  standalone: false,
})
class DateSelectorStub {
  @Input() date: string = DateTime.now().toISODate()
  @Output() dateChange = new EventEmitter<string>()
  @Input() filter: (date: DateTime | null) => boolean = () => true
}

describe('CleanComponent', () => {
  let component: CleanComponent
  let fixture: ComponentFixture<CleanComponent>
  let updates: jasmine.SpyObj<CleanService>

  beforeEach(async () => {
    updates = jasmine.createSpyObj('CleanService', {
      getClean: new Promise<void>(() => {
        return
      }),
    })
    await TestBed.configureTestingModule({
      declarations: [CleanComponent, DateSelectorStub],
      providers: [{ provide: UpdatesService, useValue: updates }],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatDatepicker,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(CleanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
