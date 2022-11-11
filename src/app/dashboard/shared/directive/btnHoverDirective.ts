import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[hoverBtnDirective]',
})
export class HoverBtnDiretive {
  @Input() colorPrimary: string | undefined = 'gray';
  @Input() colorSecondary: string = 'green';

  @HostBinding('style.backgroundColor') bgColor: string | undefined;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  @HostListener('mouseover') onMouseOver() {
//    this.bgColor = this.leavebackgroundColor;
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.colorSecondary);
  }
  @HostListener('mouseleave') onMouseLeave() {
//    this.bgColor = this.backgroundColor;
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.colorPrimary);

  }
}
