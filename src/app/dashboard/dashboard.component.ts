import { Component, HostListener, OnInit } from '@angular/core';
import { PartnerTheme } from "./shared/models/partnerTheme.model";
import { DashboardService } from "./dashboard.service";
import { LoadingService } from "../core/loading/loading.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public backGroundClass = false;
  public partnerTheme: PartnerTheme | null | undefined;

  constructor(private dashBoardService: DashboardService,private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.dashBoardService.partnerTheme$.subscribe( (parnetTheme: PartnerTheme | null)=> {
      this.partnerTheme = parnetTheme;
      this.loadingService.tryToStopLoading();
    } )
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    this.backGroundClass = window.scrollY > 100;
    console.log(event);
  }



}
