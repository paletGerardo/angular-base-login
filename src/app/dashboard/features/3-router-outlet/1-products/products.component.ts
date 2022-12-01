import { Component, OnInit } from '@angular/core';
import { Observable} from "rxjs";
import { debounceTime} from 'rxjs/operators';
import { Producto } from "../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../dashboard.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  home:boolean=true;

  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  constructor( public dashboardService: DashboardService,
    private _router: Router ) {
    // todo inyectar servicio http-wrapper
  }

  ngOnInit(): void {
    this.getProducts();
    this.dashboardService.toggleCarousel(true);
    this.dashboardService.navBarOnChanged
    .pipe(
      debounceTime(150)
    )
    .subscribe({
      next: res => {
        this.scrollDown(res);
      }
    })

    this.hideLinkNavbar();
  }

  getProducts(): void {
    this.products$ = this.dashboardService.getProducts();
  }
  // todo get productos
  productDetail(product:Producto){
    //console.log(product);
    this._router.navigate(['dashboard/product-detail/'+product.id_producto]);
  }

  scrollDown(id:any) {   
   document.getElementById(id)!.scrollIntoView();
  }

  hideLinkNavbar(){
    console.log(this.home);
    this.dashboardService.linkNavbarChanged.next(this.home);

  }
}
