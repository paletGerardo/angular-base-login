import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Producto } from "../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { environment as env} from "../../../../../environments/environment";
import { ProductItem } from 'src/app/dashboard/shared/models/productItem.model';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime } from 'rxjs/operators';

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

  //public products$: Producto[]=[];
  precio: any;
  titulo: any;

  constructor( public dashboardService: DashboardService,
    private loadingService: LoadingService,
    private activateRoute: ActivatedRoute,
    ) {
    }
  
    
      ngOnInit(): void {
       
       this.loadingService.tryToStartLoading();
        this.getProducts(); 
         
          
         // this.getProduct(this.id);
      }
      getProducts(): void {
        this.dashboardService.getProducts()
        .pipe(
          debounceTime(1000)
          )
        .subscribe((data:any)=>{
          this.products$=data;  
          console.log(this.products$);
          this.activateRoute.url.subscribe(
            (res: any) => {
              console.log(res[1].path);
              this.id=res[1].path;
            });
          this.getProduct(this.id);
          this.getProductItemByIdProducto();      

        
       });
         
    
      }

      getProduct(id:number){
        console.log(this.products$);
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
          this.precio=this.prodItem[0].seccion_cero_precio_base;
          this.titulo=this.prodItem[0].seccion_cero_titulo;
        });
      }
    
}
