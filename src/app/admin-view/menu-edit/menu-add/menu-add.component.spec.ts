import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MenuAddComponent } from './menu-add.component'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatRadioModule } from '@angular/material/radio'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('MenuAddComponent', () => {
  let component: MenuAddComponent
  let fixture: ComponentFixture<MenuAddComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAddComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        MatDialogModule,
        MatRadioModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(MenuAddComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
