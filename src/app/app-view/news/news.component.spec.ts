import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { UpdatesService } from 'src/app/services/updates.service';
import { of } from 'rxjs';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async () => {
    const updatesMock = jasmine.createSpyObj('UpdatesService', {
      getNews: of()
    })
    await TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      providers: [
        {provide: UpdatesService, useValue: updatesMock}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
