import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { PartnerTheme } from '../models/partnerTheme.model';

@Directive({
  selector: '[buttonDirective]',
})
export class ButtonDiretive {
  @Input() colorPrimary: string | undefined = 'gray';
  @Input() colorSecondary: string | undefined = 'green';

  @HostBinding('style.backgroundColor') bgColor: string | undefined;
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardService.partnerTheme$.subscribe(
      (themes: PartnerTheme) => {
        this.colorPrimary = themes?.colors.rgba_primary;
        this.colorSecondary = themes?.colors.rgba_secondary;
        this.renderer.setStyle(
          this.elRef.nativeElement,
          'background-color',
          this.colorPrimary
        );
      }
    );
  }

  @HostListener('mouseover') onMouseOver() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      this.colorSecondary
    );
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      this.colorPrimary
    );
  }
}
