import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../dashboard.service';
import { LoadingService } from '../../../../../../core/loading/loading.service';
import {TemaSocio} from '../../../../../shared/models/partnerTheme.model';
import {ENDPOINTS_API} from "../../../../../../core/routes/api.routes";
import {Producto} from "../../../../../shared/models/productsResponse.model";
import {GlobalResponse} from "../../../../../../core/http/http.response.model";
import {Router} from "@angular/router";

export interface BaseProducto {
  id: string,
  id_producto: string,
  cuit_socio: string,
}

export interface Cobertura extends BaseProducto {
  descripcion: string,
  url_icono: string,
}
export interface TemaProducto extends BaseProducto {
  titulo: string,
  slogan: string,
  precio_base: string,
  url_imagen1: string,
  url_imagen2: string,
  url_imagen_precio: string,
  coberturas: Cobertura[];

}

export interface DetalleProducto extends BaseProducto {
  titulo: string,
  descripcion: string,
  subTitulo: string,
  items: ItemsProducto[]

}

export interface ItemsProducto extends BaseProducto {
  descripcion: string,
  prioridad: string,
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Producto | undefined;
  id: string = '';
  public partnerTheme: TemaSocio | null | undefined;
  url: any;
  prodItem: TemaProducto | undefined;
  notImage: boolean = false;
  bgcolor: string | undefined;
  constructor(
    public dashBoardService: DashboardService,
    private loadingService: LoadingService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.bgcolor = this.dashBoardService.secondaryColor;
    this.getProductItemByIdProducto();
    this.dashBoardService.partnerTheme$.subscribe(
      (partnerTheme: TemaSocio | undefined) => {
        this.partnerTheme = partnerTheme;
        this.loadingService.tryToStopLoading();
      }
    );
  }

  getProductItemByIdProducto(): void {
    if (this.product?.id_producto !== undefined) {
      this.id = this.product?.id_producto;
      this.dashBoardService.getProductItemByIdProducto(this.id).subscribe((data: GlobalResponse) => {
          this.prodItem = data.body;
          if ( this.prodItem && this.prodItem.url_imagen1 ) {
            this.url = this.prodItem.url_imagen1;
            this.notImage = false;
          } else {
            this.notImage = false;
            this.url = `${ENDPOINTS_API.IMGAGEN_PRODUCTO_1}/${this.product?.id_producto}/cuit/${this.dashBoardService.getCuit()}/numero-imagen/1`;
          }
        });
    }
  }

  verDetalleProducto(idProducto:string){
    this._router.navigate(['dashboard/product-detail/'+idProducto]);
  }
}
