import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { DashboardService } from "../../../../../dashboard.service";
import { LoadingService } from "../../../../../../core/loading/loading.service";

import SwiperCore, {Autoplay, EffectCards, Navigation} from "swiper";
import { Producto } from "../../../../../shared/models/productsResponse.model";
import { Router } from "@angular/router";

// install Swiper modules
SwiperCore.use([EffectCards]);
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);

@Component( {
  selector: 'app-carousel-product',
  templateUrl: './carousel-product.component.html',
  styleUrls: [ './carousel-product.component.scss' ],
  encapsulation: ViewEncapsulation.None,

} )
export class CarouselProductComponent implements OnInit {
  url: string = "";
  producto: Producto | undefined;
  prodItem: any = [];
  itemsArray: any = [];
  itemsArray2: any = [];
  plans: any = [];
  precio: any;
  titulo: any;

  constructor(
    public dashboardService: DashboardService,
    private loadingService: LoadingService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.getProducts();

  }
  getProducts(): void {
    this.dashboardService.getProductsObs();
  }

  productDetail(product:Producto){
    this.getProductItemByIdProducto(product);

    this._router.navigate(['dashboard/product-detail/'+product.id_producto]);
  }

  getProductItemByIdProducto(product:Producto): void {
    this.dashboardService.getProductItemByIdProducto( product.id_producto ).subscribe( (data: any ) => {
      this.dashboardService.onUrlChanged$.next(data);
    } );



  }
}


