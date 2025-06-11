import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MenuEditComponent } from './menu-edit.component'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FDSelection } from 'src/app/fd.da'
import { ReactiveFormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter'

xdescribe('MenuEditComponent', () => {
  let component: MenuEditComponent
  let fixture: ComponentFixture<MenuEditComponent>

  beforeEach(() => {
    const acMock = jasmine.createSpyObj('AdminCommService', {
      getMenu: of(),
    })
    TestBed.configureTestingModule({
      declarations: [MenuEditComponent],
      imports: [
        MatTableModule,
        MatInputModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatIconModule,
      ],
      providers: [
        provideLuxonDateAdapter(),
        { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: FDSelection },
        // { provide: AdminCommService, useValue: acMock },
      ],
    })
    fixture = TestBed.createComponent(MenuEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
