import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PartnerTheme } from '../../shared/models/partnerTheme.model';
import { DashboardService } from '../../dashboard.service';
import { LoadingService } from '../../../core/loading/loading.service';

import { SwiperComponent } from 'swiper/angular';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  public partnerTheme: PartnerTheme | null | undefined;
  public images: string[] = [];
  selectedIndex = 0;
  indicators = true;
  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.dashBoardService.partnerTheme$.subscribe(
      (parnetTheme: PartnerTheme | null) => {
        if (parnetTheme) {
          this.partnerTheme = parnetTheme;
          this.partnerTheme.carousel_list.forEach( (value) => {
            this.images.push(value.url);
          })
          this.loadingService.tryToStopLoading();
        }
      }
    );
  }
  selectImage(index: number): void {
    this.selectedIndex = index;
  }
}
