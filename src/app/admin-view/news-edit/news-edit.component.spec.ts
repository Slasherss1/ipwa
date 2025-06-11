import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewsEditComponent } from './news-edit.component'
import { AdminCommService } from '../admin-comm.service'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { of } from 'rxjs'
import { MatCardModule } from '@angular/material/card'

describe('NewsEditComponent', () => {
  let component: NewsEditComponent
  let fixture: ComponentFixture<NewsEditComponent>
  let acMock

  beforeEach(() => {
    acMock = {
      news: {
        getNews: jasmine.createSpy('getNews').and.returnValue(of([])),
      },
    }
    TestBed.configureTestingModule({
      declarations: [NewsEditComponent],
      providers: [{ provide: AdminCommService, useValue: acMock }],
      imports: [MatDialogModule, MatSnackBarModule, MatCardModule],
    })
    fixture = TestBed.createComponent(NewsEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
