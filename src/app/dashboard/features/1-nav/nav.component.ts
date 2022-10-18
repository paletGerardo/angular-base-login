import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { PartnerTheme } from "../../shared/models/partnerTheme.model";
import { DashboardService } from "../../dashboard.service";
import { LoadingService } from "../../../core/loading/loading.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component( {
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: [ './nav.component.css' ]
} )
export class NavComponent implements AfterViewInit, OnInit {

  public partnerTheme: PartnerTheme | null | undefined;
  public showMenuButton: boolean | undefined;
  public backGroundClass = false;

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
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: PartnerTheme | null ) => {
      this.partnerTheme = parnetTheme;
      this.loadingService.tryToStopLoading();
    } )
  }

//   @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener( 'window:scroll', [ '$event' ] ) // for window scroll events
  onScroll( event: any ) {
    this.backGroundClass = window.scrollY > 100;
  }
}
