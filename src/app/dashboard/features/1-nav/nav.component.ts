import { Component, HostListener, OnInit } from '@angular/core';
import { PartnerTheme } from "../../shared/models/partnerTheme.model";
import { DashboardService } from "../../dashboard.service";
import { LoadingService } from "../../../core/loading/loading.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public partnerTheme: PartnerTheme | null | undefined;
  public showMenuButton = false;
  public backGroundClass = false;
  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
  this.showMenuButton = false;
    this.dashBoardService.partnerTheme$.subscribe( (parnetTheme: PartnerTheme | null)=> {
      this.partnerTheme = parnetTheme;
      this.loadingService.tryToStopLoading();
    } )
  }
//   @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    this.backGroundClass = window.scrollY > 100;
    console.log(event);
  }

  public toggleMenuButton(): boolean {
    this.showMenuButton = !this.showMenuButton
    return this.showMenuButton;

  }
}
