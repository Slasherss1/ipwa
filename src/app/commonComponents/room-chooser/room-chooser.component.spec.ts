import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChooserComponent } from './room-chooser.component';

describe('RoomChooserComponent', () => {
  let component: RoomChooserComponent;
  let fixture: ComponentFixture<RoomChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomChooserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
