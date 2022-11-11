import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from "../../../../../dashboard.service";
import { LoadingService } from "../../../../../../core/loading/loading.service";
import { PartnerTheme } from "../../../../../shared/models/partnerTheme.model";
import { Producto } from "../../../../../shared/models/productsResponse.model";

@Component( {
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [ './product-card.component.scss' ]
} )
export class ProductCardComponent implements OnInit {

  @Input() product: Producto | undefined;
   id:number=0;
  public partnerTheme: PartnerTheme | null | undefined;
  url: any;
  prodItem: any;
  notImage: boolean=false;
  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.getProductItemByIdProducto();
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: PartnerTheme | null ) => {
      this.partnerTheme = parnetTheme;
      this.loadingService.tryToStopLoading();
    } )
  }

  getProductItemByIdProducto(): void {
    if(this.product?.id_producto!==undefined){
      this.id=this.product?.id_producto;
      this.dashBoardService.getProductItemByIdProducto(this.id).subscribe((data:any)=>{
        this.prodItem=data;
       if(this.prodItem && this.prodItem.length && this.prodItem[0].product_image){
        this.url=this.prodItem[0].product_image;
        this.notImage=false;
       } else {
         this.notImage=true;
       }
      });
    }

  }
}
