import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MenuUploadComponent } from './menu-upload.component'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MenuEditService } from '../menu-edit.service'

xdescribe('MenuUploadComponent', () => {
  let component: MenuUploadComponent
  let fixture: ComponentFixture<MenuUploadComponent>

  beforeEach(() => {
    const acMock = jasmine.createSpyObj('AdminCommService')
    TestBed.configureTestingModule({
      declarations: [MenuUploadComponent],
      providers: [
        { provide: MenuEditService, useValue: acMock },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [MatDialogModule],
    })
    fixture = TestBed.createComponent(MenuUploadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
