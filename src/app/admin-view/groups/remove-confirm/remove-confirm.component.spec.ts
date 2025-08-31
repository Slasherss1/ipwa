import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RemoveConfirmComponent } from './remove-confirm.component'
import { MatDialogModule } from '@angular/material/dialog'

describe('RemoveConfirmComponent', () => {
  let component: RemoveConfirmComponent
  let fixture: ComponentFixture<RemoveConfirmComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveConfirmComponent],
      imports: [MatDialogModule],
    })
    fixture = TestBed.createComponent(RemoveConfirmComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
