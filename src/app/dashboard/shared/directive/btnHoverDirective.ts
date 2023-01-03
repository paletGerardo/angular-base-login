import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import {PartnerTheme, TemaSocio} from '../models/partnerTheme.model';

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
      (themes: TemaSocio | undefined) => {
        if (themes && themes.navbar.color_primario_rgba) {
          this.colorPrimary = themes.navbar.color_primario_rgba;
          this.colorSecondary = themes.navbar.color_primario_rgba_light;
        } else if (themes) {
          this.colorPrimary = themes.color.primario_rgba;
          this.colorSecondary = themes.color.primario_rgba_light;
        }
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
