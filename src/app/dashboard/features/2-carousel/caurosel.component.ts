import { Component, OnInit } from '@angular/core';
import { items, options } from './caroucel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  public carouselOptions = options;

  constructor() {}

  ngOnInit() {
    this.carouselOptions.onNext();
    this.carouselOptions.onPrev();
  }
}
