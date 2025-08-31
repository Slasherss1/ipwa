import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserSearchComponent } from './user-search.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

xdescribe('UserSearchComponent', () => {
  let component: UserSearchComponent
  let fixture: ComponentFixture<UserSearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSearchComponent],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UserSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
