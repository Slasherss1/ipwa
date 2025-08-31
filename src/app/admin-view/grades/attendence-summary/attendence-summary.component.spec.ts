import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AttendenceSummaryComponent } from './attendence-summary.component'
import { RouterModule } from '@angular/router'
import { MatTableModule } from '@angular/material/table'
import { GradesService } from '../grades.service'

xdescribe('AttendenceSummaryComponent', () => {
  let component: AttendenceSummaryComponent
  let fixture: ComponentFixture<AttendenceSummaryComponent>
  let acMock

  beforeEach(async () => {
    acMock = {}
    await TestBed.configureTestingModule({
      declarations: [AttendenceSummaryComponent],
      imports: [RouterModule.forRoot([]), MatTableModule],
      providers: [{ provide: GradesService, useValue: acMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(AttendenceSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
