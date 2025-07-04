import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponent } from './groups.component';
import { AdminCommService } from '../admin-comm.service';
import { of } from 'rxjs';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  beforeEach(() => {
    const acMock = {
      groups: {
        getGroups: jasmine.createSpy("getGroups").and.returnValue(of())
      }
    }
    TestBed.configureTestingModule({
      declarations: [GroupsComponent],
      providers: [
        {provide: AdminCommService, useValue: acMock}
      ]
    });
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
