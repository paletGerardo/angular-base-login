import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from "../../../../../dashboard.service";
import { LoadingService } from "../../../../../../core/loading/loading.service";
import { PartnerTheme } from "../../../../../shared/models/partnerTheme.model";
import { Producto } from "../../../../../shared/models/productsResponse.model";

@Component( {
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [ './product-card.component.scss' ]
} )
export class ProductCardComponent implements OnInit {

  @Input() product: Producto | undefined;
  public partnerTheme: PartnerTheme | null | undefined;

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: PartnerTheme | null ) => {
      this.partnerTheme = parnetTheme;
      this.loadingService.tryToStopLoading();
    } )
  }
}
