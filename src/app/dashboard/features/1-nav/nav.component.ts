import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener, isDevMode,
  OnInit,
} from '@angular/core';
import { PartnerTheme } from '../../shared/models/partnerTheme.model';
import { DashboardService } from '../../dashboard.service';
import { LoadingService } from '../../../core/loading/loading.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {environment as env} from "../../../../environments/environment";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements AfterViewInit, OnInit {
  public hover: boolean = false;

  public partnerTheme: PartnerTheme | null | undefined;
  public showMenuButton: boolean | undefined;
  public backGroundClass = false;

  public primaryColor: string = 'grey';
  public secundaryColor: string = '';
  public bgColor: string = '';

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();

  }
  ngOnInit() {
    this.showMenuButton = false;
    this.loadingService.tryToStartLoading();
    this.dashBoardService.partnerTheme$.subscribe(
      (partnerThemes: PartnerTheme | null) => {
        if (partnerThemes) {
          this.partnerTheme = partnerThemes;
          this.primaryColor = partnerThemes.colors.rgba_primary;
          this.secundaryColor = partnerThemes.colors.rgba_primary_light;
          this.bgColor = this.primaryColor;
          this.loadingService.tryToStopLoading();
        }
      }
    );
  }
  //   @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if(window.scrollY < 100) {
      this.bgColor = this.primaryColor;
    } else {
      this.bgColor = this.secundaryColor

    }

    this.backGroundClass = window.scrollY > 100;
  }
}
