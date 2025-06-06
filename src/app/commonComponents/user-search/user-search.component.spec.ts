import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComponent } from './user-search.component';
import { AdminCommService } from 'src/app/admin-view/admin-comm.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let acMock

  beforeEach(async () => {
    acMock = {

    }
    await TestBed.configureTestingModule({
      declarations: [UserSearchComponent],
      providers: [
        { provide: AdminCommService, useValue: acMock }
      ],
      imports: [
        MatAutocompleteModule, 
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
