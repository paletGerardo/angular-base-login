import { Component, OnInit } from '@angular/core';
import { PartnerTheme } from "../../shared/models/partnerTheme.model";
import { DashboardService } from "../../dashboard.service";
import { LoadingService } from "../../../core/loading/loading.service";

@Component( {
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [ './carousel.component.scss' ]
} )
export class CarouselComponent implements OnInit {
  public partnerTheme: PartnerTheme | null | undefined;
  public images: string[] = [];
  selectedIndex = 0;
  indicators = true;
  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: PartnerTheme | null ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
//        this.images.push(this.partnerTheme.carousel_image1);
        this.images.push("https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(40).webp");
        this.images.push("https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(35).webp");
        this.images.push("https://www.servicioscarrefour1.com.ar/documents/23744/0/banner+092021/285d91a5-7358-41da-a8ad-a13c5c0c76bb?t=1630626730753");;
        this.loadingService.tryToStopLoading();
      }
    } )
  }
  selectImage(index: number): void {
    this. selectedIndex = index;
  }

}



