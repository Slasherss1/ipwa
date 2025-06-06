import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifDialogComponent } from './notif-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UpdatesService } from 'src/app/services/updates.service';
import { of } from 'rxjs';

describe('NotifDialogComponent', () => {
  let component: NotifDialogComponent;
  let fixture: ComponentFixture<NotifDialogComponent>;
  
  beforeEach(async () => {
    const uMock = jasmine.createSpyObj<UpdatesService>("UpdatesService", {
      postInfoAck: of()
    })
    await TestBed.configureTestingModule({
      declarations: [NotifDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {message: "Test"}},
        {provide: MatDialogRef, useValue: {}},
        {provide: UpdatesService, useValue: uMock}
      ],
      imports: [
        MatDialogModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
