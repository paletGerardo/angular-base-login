import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../../../../../../dashboard.service";
import { HttpWrapperService } from "../../../../../../../../core/http/http-wrapper.service";
import { LoadingService } from "../../../../../../../../core/loading/loading.service";
import { ENDPOINTS_API } from "../../../../../../../../core/routes/api.routes";
import { PartnerTheme } from "../../../../../../../shared/models/partnerTheme.model";
@Component({
  selector: 'app-cards',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public partnerTheme: PartnerTheme | null | undefined;

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.dashBoardService.partnerTheme$.subscribe( (parnetTheme: PartnerTheme | null)=> {
      this.partnerTheme = parnetTheme;
      this.loadingService.tryToStopLoading();
    })
  }
}
