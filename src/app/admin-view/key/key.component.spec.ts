import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminKeyComponent } from './key.component'
import { of } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator'
import { FormsModule } from '@angular/forms'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

xdescribe('AdminKeyComponent', () => {
  let component: AdminKeyComponent
  let fixture: ComponentFixture<AdminKeyComponent>
  let acMock

  beforeEach(async () => {
    acMock = {
      keys: {
        getKeys: jasmine.createSpy('getKeys').and.returnValue(of()),
      },
    }
    await TestBed.configureTestingModule({
      declarations: [AdminKeyComponent],
      // providers: [{ provide: AdminCommService, useValue: acMock }],
      imports: [
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatPaginatorModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AdminKeyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
