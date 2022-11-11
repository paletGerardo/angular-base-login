import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Producto } from "../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../dashboard.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  constructor( public dashboardService: DashboardService,
    private _router: Router ) {
    // todo inyectar servicio http-wrapper
  }

  ngOnInit(): void {
    this.getProducts();
    this.dashboardService.toggleCarousel(true);
  }

  getProducts(): void {
    this.products$ = this.dashboardService.getProducts();
  }
  // todo get productos
  productDetail(product:Producto){
    //console.log(product);
    this._router.navigate(['dashboard/product-detail/'+product.id_producto]);
  }
}
