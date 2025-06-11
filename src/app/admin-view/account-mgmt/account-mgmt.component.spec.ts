import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AccountMgmtComponent } from './account-mgmt.component'
import { AdminCommService } from '../admin-comm.service'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator'
import { of } from 'rxjs'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

describe('AccountMgmtComponent', () => {
  let component: AccountMgmtComponent
  let fixture: ComponentFixture<AccountMgmtComponent>
  let acMock

  beforeEach(async () => {
    acMock = {
      accs: {
        getAccs: jasmine.createSpy('getAccs').and.returnValue(of()),
      },
    }
    await TestBed.configureTestingModule({
      declarations: [AccountMgmtComponent],
      providers: [{ provide: AdminCommService, useValue: acMock }],
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
