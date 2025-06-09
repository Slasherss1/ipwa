import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { AdminCommService } from '../admin-comm.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-list-editor', template: '',
    standalone: false
})
class ListEditorStub {
  @Input() converter?: any[];
  @Input() list?: string[];

}

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    const acMock = {
      settings: {
        getAll: jasmine.createSpy("getAll").and.returnValue(of())
      }
    }
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent, ListEditorStub],
      providers: [
        {provide: AdminCommService, useValue: acMock}
      ],
      imports: [
        MatExpansionModule,
        MatTabsModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        NoopAnimationsModule,
        MatInputModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
