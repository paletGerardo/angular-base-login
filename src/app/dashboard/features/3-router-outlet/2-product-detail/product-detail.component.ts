import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Producto } from "../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { environment as env} from "../../../../../environments/environment";
import { ProductItem } from 'src/app/dashboard/shared/models/productItem.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id:number=0;
  url:string="";
  producto:Producto | undefined;
   prodItem:any=[];
   itemsArray:any=[];
   planes:any=[];


  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  constructor( public dashboardService: DashboardService,
    private loadingService: LoadingService,
    private activateRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    }
  
    
      ngOnInit(): void {
       this.loadingService.tryToStartLoading();
        this.getProducts(); 
        //this.getImageProductByIdProductAndCuit();

        this.activateRoute.url.subscribe(
          (res: any) => {
              console.log(res[1].path);
              this.id=res[1].path;
        }

        )
        this.getProduct(this.id);
        this.getProductItemByIdProducto();
       //this.url='https://localhost:8080/landing/products/getImageByProductId/'+this.id+'/30687310434';
      
      }
      getProducts(): void {
       this.dashboardService.getProducts().subscribe((data:any)=>{
        console.log(data);
        this.products$=data;  

       });
      }

      getProduct(id:number){
        this.products$.forEach((produc:any) => {
            if(produc.id_producto==id){
              console.log(produc)
              this.producto=produc;
              this.planes=this.producto?.planes;
             
               console.log(this.planes);  
            }
          });
       
      }
      getProductItemByIdProducto(): void {
        this.dashboardService.getProductItemByIdProducto(this.id).subscribe((data:any)=>{
          this.prodItem=data;
          console.log(this.prodItem);
          let items=this.prodItem[0].seccion_uno_items;
         this.itemsArray= items.split('|');
          console.log(this.itemsArray);  
          this.url=this.prodItem[0].product_image;
        });
      }
    
}
