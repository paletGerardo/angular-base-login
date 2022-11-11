import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Producto } from "../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { environment as env} from "../../../../../environments/environment";
import { ProductItem } from 'src/app/dashboard/shared/models/productItem.model';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, map } from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';




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
   itemsArray2:any=[];
   cobert:boolean=false;

   planCopia:any;


   planes:any=[];
   firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
 
  stepperOrientation: Observable<StepperOrientation>;

   public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  //public products$: Producto[]=[];
  precio: any;
  titulo: any;
  riesgos: any=[];

  constructor( public dashboardService: DashboardService,
    private loadingService: LoadingService,
    private activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    }
  
    
      ngOnInit(): void {      
       this.loadingService.tryToStartLoading();       
       this.getProducts(); 
       
         // this.getProduct(this.id);
      }
      getProducts(): void {
        this.dashboardService.getProducts()
        
        .subscribe((data:any)=>{
          this.products$=data;  
          console.log(this.products$);
          this.activateRoute.params.subscribe(
            (res: any) => {
              this.id=res.id;
            });
            this.getProduct(this.id);
            this.getProductItemByIdProducto();     
            this.coberturas(this.planCopia);
            
       });
         
    
      }

      getProduct(id:number){
        console.log(this.products$);
        this.products$.forEach((produc:any) => {
            if(produc.id_producto==id){
              console.log(produc)
              this.producto=produc;
              this.planes=this.producto?.planes;
            }
          });
          console.log(this.planes);
          this.ordenarPlanes();
          this.planCopia=this.planes[0];
          console.log('planes',this.planes[0]);
          
      }
      ordenarPlanes(){
        this.planes.sort(function (a:any, b:any) {
          // A va primero que B
          if (a.codigo_plan < b.codigo_plan)
              return -1;
          // B va primero que A
          else if (a.codigo_plan > b.codigo_plan)
              return 1;
          // A y B son iguales
          else 
              return 0;
      });
      
      console.log(this.planes);
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
          let items2=this.prodItem[0].seccion_dos_items;
          this.itemsArray2= items2.split('|');
           console.log(this.itemsArray);  
        });
      }

      getCoberturas(){
        this.dashboardService.getCoberturas(this.id).subscribe(res=>{
          console.log(res);
          const blob = new Blob([res], {
            type: 'data:application/pdf',
          });
          const url = window.URL.createObjectURL(blob);
          let link=document.createElement('a');
          link.href=url;
          link.download='cobertura.pdf';
          link.dispatchEvent(
            new MouseEvent('click',{
              bubbles:true,
              cancelable:true,
              view:window,
            })
          );
        });
      }  
      coberturas(plan:any){
        console.log('fabi gil',plan);
        this.cobert=true;
        console.log(plan.rangos[0].riesgos);
        this.riesgos=plan.rangos[0].riesgos;
      }


  
}    

      

   