import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { DashboardService } from "../../dashboard.service";
import { LoadingService } from "../../../core/loading/loading.service";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {Autoplay, EffectCards, Navigation} from "swiper";
import { Observable } from "rxjs";
import { Producto } from "../../shared/models/productsResponse.model";
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
  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();
  url: string = "";
  producto: Producto | undefined;
  prodItem: any = [];
  itemsArray: any = [];
  itemsArray2: any = [];
  plans: any = [];
  precio: any;
  titulo: any;

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.getProducts();

  }
  getProducts(): void {
    this.products$ = this.dashBoardService.getProducts();
  }

  productDetail(product:Producto){
    //console.log(product);
    this.getProductItemByIdProducto(product);
    
    this._router.navigate(['dashboard/product-detail/'+product.id_producto]);
  }

  getProductItemByIdProducto(product:Producto): void {
    this.dashBoardService.getProductItemByIdProducto( product.id_producto ).subscribe( ( data: any ) => {
      this.dashBoardService.onUrlChanged$.next(data);
    } );

    
    
  }
}


