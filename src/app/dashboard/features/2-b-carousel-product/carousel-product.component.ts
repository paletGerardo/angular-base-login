import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { DashboardService } from "../../dashboard.service";
import { LoadingService } from "../../../core/loading/loading.service";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCards } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards]);


@Component( {
  selector: 'app-carousel-product',
  templateUrl: './carousel-product.component.html',
  styleUrls: [ './carousel-product.component.scss' ],
  encapsulation: ViewEncapsulation.None,

} )
export class CarouselProductComponent implements OnInit {
  
  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {

  }
 

}


