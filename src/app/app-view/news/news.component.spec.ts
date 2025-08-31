import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewsComponent } from './news.component'
import { UpdatesService } from 'src/app/services/updates.service'
import { of } from 'rxjs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { MatCardModule } from '@angular/material/card'

describe('NewsComponent', () => {
  let component: NewsComponent
  let fixture: ComponentFixture<NewsComponent>

  beforeEach(async () => {
    const updatesMock = jasmine.createSpyObj('UpdatesService', {
      getNews: of(),
    })
    const lsMock = {
      news: [],
    }
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [
        { provide: UpdatesService, useValue: updatesMock },
        { provide: LocalStorageService, useValue: lsMock },
      ],
      imports: [MatProgressSpinnerModule, NoopAnimationsModule, MatCardModule],
    }).compileComponents()

    fixture = TestBed.createComponent(NewsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
