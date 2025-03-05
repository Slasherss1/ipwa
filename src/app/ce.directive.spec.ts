import { ElementRef } from '@angular/core';
import { CeDirective } from './ce.directive';

describe('CeDirective', () => {
  it('should create an instance', () => {
    const elref = jasmine.createSpyObj<ElementRef>({
      nativeElement: null
    })
    const directive = new CeDirective(elref);
    expect(directive).toBeTruthy();
  });
});
