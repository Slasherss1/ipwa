import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadShadeComponent } from './load-shade.component';

describe('LoadShadeComponent', () => {
  let component: LoadShadeComponent;
  let fixture: ComponentFixture<LoadShadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadShadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
