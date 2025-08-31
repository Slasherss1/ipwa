import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupsComponent } from './groups.component'
import { GroupsService } from './groups.service'

xdescribe('GroupsComponent', () => {
  let component: GroupsComponent
  let fixture: ComponentFixture<GroupsComponent>

  beforeEach(() => {
    const acMock = {}
    TestBed.configureTestingModule({
      declarations: [GroupsComponent],
      providers: [{ provide: GroupsService, useValue: acMock }],
    })
    fixture = TestBed.createComponent(GroupsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
