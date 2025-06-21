import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MessageComponent } from './message.component'
import { MatCardModule } from '@angular/material/card'
import { DateTime } from 'luxon'
import { NotificationsService } from '../../notifications.service'

xdescribe('MessageComponent', () => {
  let component: MessageComponent
  let fixture: ComponentFixture<MessageComponent>

  beforeEach(async () => {
    const acMock = {}
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [{ provide: NotificationsService, useValue: acMock }],
      imports: [MatCardModule],
    }).compileComponents()

    fixture = TestBed.createComponent(MessageComponent)
    component = fixture.componentInstance
    component.item = { _id: 'test', sentDate: DateTime.now(), title: 'Test' }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
