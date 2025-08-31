import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AccountMgmtComponent } from './account-mgmt.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AccountMgmtService } from './account-mgmt.service'
import { LoadShadeComponent } from 'src/app/commonComponents/load-shade/load-shade.component'
import { of } from 'rxjs'
import { signal } from '@angular/core'
import { STATE } from 'src/app/types/state'

describe('AccountMgmtComponent', () => {
  let component: AccountMgmtComponent
  let fixture: ComponentFixture<AccountMgmtComponent>
  let acMock

  beforeEach(async () => {
    acMock = {
      accs: of([]),
      state: signal(STATE.NOT_LOADED),
      refresh: jasmine.createSpy('getAccs'),
      error: signal(undefined)
    }
    await TestBed.configureTestingModule({
      declarations: [AccountMgmtComponent, LoadShadeComponent],
      providers: [{ provide: AccountMgmtService, useValue: acMock }],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(AccountMgmtComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
