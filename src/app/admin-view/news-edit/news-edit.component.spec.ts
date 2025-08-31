import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewsEditComponent } from './news-edit.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatCardModule } from '@angular/material/card'
import { NewsEditService } from './news-edit.service'

xdescribe('NewsEditComponent', () => {
  let component: NewsEditComponent
  let fixture: ComponentFixture<NewsEditComponent>
  let acMock

  beforeEach(() => {
    acMock = {}
    TestBed.configureTestingModule({
      declarations: [NewsEditComponent],
      providers: [{ provide: NewsEditService, useValue: acMock }],
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
