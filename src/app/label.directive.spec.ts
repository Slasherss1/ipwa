import { TestBed } from '@angular/core/testing'
import { LabelDirective } from './label.directive'

describe('LabelDirective', () => {
  it('should create an instance', () => {
    let directive
    TestBed.runInInjectionContext(() => {
      directive = new LabelDirective()
    })
    expect(directive).toBeTruthy()
  })
})
