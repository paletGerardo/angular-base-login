import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../dashboard.service";
import { LoadingService } from "../../../core/loading/loading.service";

@Component( {
  selector: 'app-carousel-product',
  templateUrl: './carousel-product.component.html',
  styleUrls: [ './carousel-prouduct.component.scss' ]
} )
export class CarouselComponent implements OnInit {
  
  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {

  }
 

}


