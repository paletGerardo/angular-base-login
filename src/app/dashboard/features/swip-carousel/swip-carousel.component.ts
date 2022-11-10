import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions, Pagination, Virtual, Swiper } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-swip-carousel',
  templateUrl: './swip-carousel.component.html',
  styleUrls: ['./swip-carousel.component.scss'],
})
export class SwipCarouselComponent implements OnInit {
  //@ViewChild('Swiper') newSwiper: any;
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;

  public swiperConfig: SwiperOptions = {
    pagination: true,
    slidesPerView: 1,
    spaceBetween: 1,
    freeMode: true,
    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },
  };
  constructor() {}

  ngOnInit(): void {
    Swiper.use([Pagination]);
    SwiperCore.use([Virtual]);
  }
  sliderA_next() {
    this.swiper.swiperRef.slideNext(100);
  }
  sliderB_prev() {
    this.swiper.swiperRef.slidePrev(100);
  }
}
