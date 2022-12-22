import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Producto } from "../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';


@Component( {
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [ './product-detail.component.scss' ]
} )
export class ProductDetailComponent implements OnInit {
  id: number = 0;
  url: string = "";
  producto: Producto | undefined;
  prodItem: any = [];
  itemsArray: any = [];
  itemsArray2: any = [];
  plans: any = [];

  firstFormGroup = this._formBuilder.group( {
    firstCtrl: [ '', Validators.required ],
  } );
  secondFormGroup = this._formBuilder.group( {
    secondCtrl: [ '', Validators.required ],
  } );

  stepperOrientation: Observable<StepperOrientation>;
  planCopia: any;
  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  //public products$: Producto[]=[];
  precio: any;
  titulo: any;
  risks: any = [];
  riskCopia:any=[];
  @Input() product: Producto | undefined;
  @Input() text:string="comprar";

  private _unsubscribeAll: Subject<any>;

  constructor( public dashboardService: DashboardService,
               private loadingService: LoadingService,
               private activateRoute: ActivatedRoute,
               private _router: Router ,
               private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver ) {
    this.stepperOrientation = breakpointObserver
      .observe( '(min-width: 800px)' )
      .pipe( map( ( { matches } ) => ( matches ? 'horizontal' : 'vertical' ) ) );
      this._unsubscribeAll = new Subject();

  }


  ngOnInit(): void {
    this.dashboardService.toggleCarousel( false );
    this.loadingService.tryToStartLoading();
    this.getProducts();


    this.dashboardService.onUrlChanged$
    .subscribe({
      next: data => {
       this.getProducts();
      },
      error: err => {
        console.log('Error Service -->',err);
        
      }
    })
    this.dashboardService.linkNavbarChanged.next(false);
      
  }

  getProducts(): void {
    this.dashboardService.getProducts()
      .pipe(
        debounceTime( 1000 )
      )
      .subscribe( ( data: any ) => {
        this.products$ = data;
        console.log( this.products$ );
        this.activateRoute.params.subscribe(
          ( res: any ) => {
            this.id = res.id;
          } );
        this.getProduct( this.id );
        this.getProductItemByIdProducto();


      } );


  }

  getProduct( id: number ) {
    console.log( this.products$ );
    this.products$.forEach( ( produc: any ) => {
      if ( produc.id_producto == id ) {
        this.producto = produc;
        this.plans = this.producto?.planes;
      }
    } );
    this.ordenarPlanes();
    this.planCopia = this.plans[0];
  }

  ordenarPlanes() {
    this.plans.sort( function ( a: any, b: any ) {
      if ( a.codigo_plan < b.codigo_plan )
        return -1;
      else if ( a.codigo_plan > b.codigo_plan )
        return 1;
      else
        return 0;
    } );
    this.showRisk(this.plans[0]);
  }


  getProductItemByIdProducto(): void {
    this.dashboardService.getProductItemByIdProducto( this.id ).subscribe( ( data: any ) => {
      this.prodItem = data;
      let items = this.prodItem[0].seccion_uno_items;
      this.itemsArray = items.split( '|' );
      this.url = this.prodItem[0].product_image;
      this.precio = this.prodItem[0].seccion_cero_precio_base;
      this.titulo = this.prodItem[0].seccion_cero_titulo;
      let items2 = this.prodItem[0].seccion_dos_items;
      this.itemsArray2 = items2.split( '|' );
    } );
  }

  getCoberturas() {
    this.dashboardService.getCoberturas( this.id ).subscribe( res => {
      console.log( res );
      const blob = new Blob( [ res ], {
        type: 'data:application/pdf',
      } );
      const url = window.URL.createObjectURL( blob );
      let link = document.createElement( 'a' );
      link.href = url;
      link.download = 'cobertura.pdf';
      link.dispatchEvent(
        new MouseEvent( 'click', {
          bubbles: true,
          cancelable: true,
          view: window,
        } )
      );
    } );
  }

  showRisk( plan: any ) {
    this.risks = plan.rangos[0].riesgos;
    console.log(this.risks.length);
    if (this.risks.length>1){
      this.riskCopia=this.risks.slice(0,2);
    }
    else{
      this.riskCopia=plan.rangos[0].riesgos;
    }
  }

  comprarProducto(){
    console.log("compra del producto",this.producto);
    this._router.navigate(['dashboard/product-purchase/'+this.producto?.id_producto]);
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  
  }


}





