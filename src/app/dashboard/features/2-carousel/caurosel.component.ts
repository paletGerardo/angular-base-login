import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ImagenCarruselResponse, TemaSocio } from '../../shared/models/partnerTheme.model';
import {DashboardService} from '../../dashboard.service';
import {LoadingService} from '../../../core/loading/loading.service';

import SwiperCore, {Pagination, Navigation} from 'swiper';
import { GlobalResponse } from "../../../core/http/http.response.model";

SwiperCore.use([Pagination, Navigation]);
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  public images: string[] = [];
  selectedIndex = 0;

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.dashBoardService.getImagesCarrusel().subscribe( (res: ImagenCarruselResponse[]) => {
          if (res.length) {
            res.forEach((value: { url: string; }) => {
              const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
              this.images.push(value.url + '?size='+vw);
            })
          }
          this.loadingService.tryToStopLoading();
        }

    );
  }
}
