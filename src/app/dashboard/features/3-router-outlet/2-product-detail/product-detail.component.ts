import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Plan, Producto } from "../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import {PartnerTheme, TemaSocio} from "../../../shared/models/partnerTheme.model";
import {
  TemaProducto,
  ItemsProducto,
  DetalleProducto,
  Cobertura
} from "../1-products/feature/product-card/product-card.component";
import {GlobalResponse} from "../../../../core/http/http.response.model";

@Component( {
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [ './product-detail.component.scss' ]
} )
export class ProductDetailComponent implements OnInit {
  idProducto: string = '';
  url: string = "";
  producto: Producto | undefined;
  temaProducto: TemaProducto | undefined;
  coberturas: Cobertura[] = [];
  detalleProducto: DetalleProducto | undefined;
  itemsArray: any = [];
  itemsArray2: any = [];
  plan:string="B";
  plans: Plan[] = [];

  firstFormGroup = this._formBuilder.group( {
    firstCtrl: [ '', Validators.required ],
  } );
  secondFormGroup = this._formBuilder.group( {
    secondCtrl: [ '', Validators.required ],
  } );

  stepperOrientation: Observable<StepperOrientation>;
  planCopia: Plan | undefined;
  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  //public products$: Producto[]=[];
  precio: any;
  titulo: any;
  risks: any = [];
  riskCopia: any = [];
  @Input() product: Producto | undefined;
  public primaryColor: string | undefined;
  public secundaryColor: string | undefined;
  @Input() text:string="comprar";

  private _unsubscribeAll: Subject<any>;
  public mostrarmeLasDescargas: boolean = false;

  constructor( public dashboardService: DashboardService,
               private loadingService: LoadingService,
               private activateRoute: ActivatedRoute,
               private _router: Router,
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
    this.scrollDown( 'title' )
    this.dashboardService.onUrlChanged$.subscribe( {
        next: data => {
          this.getProducts();
        },
        error: err => {
          console.log( 'Error Service -->', err );

        }
      } )
    this.dashboardService.linkNavbarChanged.next( false );
    this.dashboardService.partnerTheme$.subscribe(
      ( partnerThemes: TemaSocio | undefined ) => {
        if ( partnerThemes ) {
          this.primaryColor = partnerThemes.color.primario_rgba;
          this.secundaryColor = partnerThemes.color.secundario_rgba;
        }
      }
    );
  }

  scrollDown( id: any ) {
    document.getElementById( id )!.scrollIntoView();
  }

  getProducts(): void {
    this.dashboardService.getProducts().pipe( debounceTime( 0 ) ).subscribe( ( data: any ) => {
      this.products$ = data;
      this.activateRoute.params.subscribe(
        ( res: any ) => {
          this.idProducto = res.id;
        } );
      this.getProduct( this.idProducto );
      this.getCoberturasByCuitSocioAndIdProducto(this.idProducto);
      this.getProductItemByIdProducto();
      this.getProductDetailByIdProductoAndCuit();
    } );


  }

  getProduct( id: string ) {
    this.products$.forEach( ( produc: any ) => {
      if ( produc.id_producto == id ) {
        this.producto = produc;
        if ( this.producto ) {
          this.plans = this.producto.planes;
          this.plans.forEach( ( plan, index ) => {
            if ( index == 0 ) {
              plan.activeColor = this.primaryColor;
            }
            plan.activeColor = 'white';
          } )
        }
      }
    } );
    this.ordenarPlanes();
    this.planCopia = this.plans[0];
    this.precio = this.planCopia.rangos[0].precio;
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
    this.showRisk( this.plans[0] );
  }


  getProductItemByIdProducto(): void {
    this.dashboardService.getProductItemByIdProducto( this.idProducto ).subscribe( (data: GlobalResponse ) => {
      this.temaProducto = data.body;
    } );
  }

  getCoberturasByCuitSocioAndIdProducto(idProducto: string): void {
    this.dashboardService.getCoberturasByCuitSocioAndIdProducto( idProducto ).subscribe( (data: GlobalResponse ) => {
      this.coberturas = data.body;
    } );
  }

  getProductDetailByIdProductoAndCuit() {
    this.dashboardService.getProductDetailByIdProductoAndCuit( this.idProducto ).subscribe( (data: GlobalResponse ) => {
      this.detalleProducto = data.body;
    } );
  }

  getCoberturas() {
    this.dashboardService.getCoberturas( this.idProducto ).subscribe(res => {
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

  getCondiciones() {
    this.dashboardService.getCondiciones( this.idProducto ).subscribe(res => {
      console.log( res );
      const blob = new Blob( [ res ], {
        type: 'data:application/pdf',
      } );
      const url = window.URL.createObjectURL( blob );
      let link = document.createElement( 'a' );
      link.href = url;
      link.download = 'condiciones.pdf';
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
    console.log("plan", plan);
    this.plan=plan.codigo_plan;
    this.precio=plan.rangos[0].precio;
    this.risks = plan.rangos[0].riesgos;
    console.log( this.risks.length );
    console.log(this.risks);
    if ( this.risks.length > 1 ) {
      this.riskCopia = this.risks.slice( 0, 2 );
    } else {
      this.riskCopia = plan.rangos[0].riesgos;
    }
  }

  comprarProducto(){
    console.log("compra del producto",this.producto);
    this._router.navigate(['dashboard/product-purchase/'+this.producto?.id_producto]);
    this._router.navigate(['dashboard/data-user/'+this.producto?.id_producto]);

  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

  }


  funcionMostrarmeLasDescargas() {
    this.mostrarmeLasDescargas = !this.mostrarmeLasDescargas;
  }

  getBorderColer(tipo: string) {
    if(tipo === 'descargas') {
      if(this.mostrarmeLasDescargas) {
        return this.secundaryColor;
      } else {
        return '#b5b8c4'
      }
    }
    if(tipo === 'detalles') {
      if(!this.mostrarmeLasDescargas) {
        return this.secundaryColor;
      } else {
        return '#b5b8c4'
      }
    }
    return '#b5b8c4'
  }


  getTextInside() {
    return `plan ${this.plan}, desde $ ${this.precio} por mes`;
  }
}





