import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AttendenceSummaryComponent } from './attendence-summary.component'
import { RouterModule } from '@angular/router'
import { AdminCommService } from '../../admin-comm.service'
import { of } from 'rxjs'
import { MatTableModule } from '@angular/material/table'

describe('AttendenceSummaryComponent', () => {
  let component: AttendenceSummaryComponent
  let fixture: ComponentFixture<AttendenceSummaryComponent>
  let acMock

  beforeEach(async () => {
    acMock = {
      clean: {
        attendence: {
          getSummary: jasmine.createSpy('getSummary').and.returnValue(of()),
        },
      },
    }
    await TestBed.configureTestingModule({
      declarations: [AttendenceSummaryComponent],
      imports: [RouterModule.forRoot([]), MatTableModule],
      providers: [{ provide: AdminCommService, useValue: acMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(AttendenceSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
