import { TestBed } from '@angular/core/testing';
import { GradeColorDirective } from './grade-color.directive';

describe('GradeColorDirective', () => {
  it('should create an instance', () => {
    let directive
    TestBed.runInInjectionContext(() => {
      directive = new GradeColorDirective();
    })
    expect(directive).toBeTruthy();
  });
});
