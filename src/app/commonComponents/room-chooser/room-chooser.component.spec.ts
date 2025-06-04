import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChooserComponent } from './room-chooser.component';
import { MatIconModule } from '@angular/material/icon';

describe('RoomChooserComponent', () => {
  let component: RoomChooserComponent;
  let fixture: ComponentFixture<RoomChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomChooserComponent],
      imports: [MatIconModule]
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
