import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminViewComponent } from './admin-view.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-toolbar',
  template: '',
  standalone: false,
})
class ToolbarMock {
  @Input() drawer!: MatDrawer
}

describe('AdminViewComponent', () => {
  let component: AdminViewComponent
  let fixture: ComponentFixture<AdminViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewComponent, ToolbarMock],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        RouterModule.forRoot([]),
      ],
    })
    fixture = TestBed.createComponent(AdminViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
