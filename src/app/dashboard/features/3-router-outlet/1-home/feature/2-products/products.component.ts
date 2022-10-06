import { Component, OnInit } from '@angular/core';
import { Producto } from "../../../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../../../dashboard.service";
import { tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

@Component( {
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
} )
export class ProductsComponent implements OnInit {
  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  constructor( public dashboardService: DashboardService ) {
    // todo inyectar servicio http-wrapper
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products$ = this.dashboardService.getProducts();
  }
  // todo get productos
}
