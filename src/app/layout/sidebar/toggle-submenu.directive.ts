import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[toggleSubmenu]' })
export class ToggleSubmenuDirective {

  constructor(
    private el: ElementRef
  ) {}

  @HostListener('click') onClick() {
    this.el.nativeElement.next().slideToggle(200);
    this.el.nativeElement.parent().toggleClass('toggled');
  }
}
