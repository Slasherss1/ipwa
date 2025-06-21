import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CeDirective } from './ce.directive'
import { Component, DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({standalone: false, template: "<p contenteditable>Yoy</p>"})
class TestComponent {}

describe('CeDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let el: DebugElement

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({

    }).createComponent(TestComponent)

    fixture.detectChanges()

    el = fixture.debugElement.query(By.directive(CeDirective))
  })

  it('should be on a component', () => {
    expect(el).toBeDefined()
  })
})
