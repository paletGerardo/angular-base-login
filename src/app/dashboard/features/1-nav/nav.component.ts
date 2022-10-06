import { Component, OnInit } from '@angular/core';
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

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.dashBoardService.partnerTheme$.subscribe( (parnetTheme: PartnerTheme | null)=> {
      this.partnerTheme = parnetTheme;
      this.loadingService.tryToStopLoading();
    } )
  }

}
