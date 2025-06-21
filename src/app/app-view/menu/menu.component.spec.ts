import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MenuComponent } from './menu.component'
import { UpdatesService } from 'src/app/services/updates.service'
import { DateSelectorComponent } from '../../commonComponents/date-selector/date-selector.component'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { of } from 'rxjs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter'

describe('MenuComponent', () => {
  let component: MenuComponent
  let fixture: ComponentFixture<MenuComponent>

  beforeEach(async () => {
    const updatesSpy = jasmine.createSpyObj('UpdatesService', {
      getMenu: of(),
    })
    await TestBed.configureTestingModule({
      declarations: [MenuComponent, DateSelectorComponent],
      providers: [
        { provide: UpdatesService, useValue: updatesSpy },
        provideLuxonDateAdapter(),
      ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatBottomSheetModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(MenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
