import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OutboxComponent } from './outbox.component'
import { RouterModule } from '@angular/router'
import { NotificationsService } from '../notifications.service'

xdescribe('OutboxComponent', () => {
  let component: OutboxComponent
  let fixture: ComponentFixture<OutboxComponent>

  beforeEach(async () => {
    const acMock = {}
    await TestBed.configureTestingModule({
      declarations: [OutboxComponent],
      providers: [{ provide: NotificationsService, useValue: acMock }],
      imports: [RouterModule.forRoot([])],
    }).compileComponents()

    fixture = TestBed.createComponent(OutboxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
