import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMyDirective]',
})
export class MyDirectiveDirective {
  @Input() backgroundColor: string = 'green';
  @Input() leavebackgroundColor: string | undefined = 'gray';

  @HostBinding('style.backgroundColor') bgColor: string | undefined;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}
  @HostListener('mouseover') onMouseOver() {
    this.bgColor = this.leavebackgroundColor;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bgColor = this.backgroundColor;
  }
}
