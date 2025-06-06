import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyComponent } from './key.component';
import { UpdatesService } from 'src/app/services/updates.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('KeyComponent', () => {
  let component: KeyComponent;
  let fixture: ComponentFixture<KeyComponent>;
  let uMock: jasmine.SpyObj<UpdatesService>

  beforeEach(async () => {
    uMock = jasmine.createSpyObj<UpdatesService>("UpdatesService", {
      getKeys: of()
    })
    await TestBed.configureTestingModule({
      declarations: [KeyComponent],
      providers: [
        {provide: UpdatesService, useValue: uMock}
      ],
      imports: [MatDialogModule, MatIconModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
