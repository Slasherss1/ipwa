import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExtraComponent } from './extra.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'

describe('ExtraComponent', () => {
  let component: ExtraComponent
  let fixture: ComponentFixture<ExtraComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraComponent],
      imports: [MatDialogModule, MatListModule],
    }).compileComponents()

    fixture = TestBed.createComponent(ExtraComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
