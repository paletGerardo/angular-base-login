import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Producto } from "../../../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';



@Component( {
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: [ './payment-summary.component.scss' ]
} )
export class PaymentSummaryComponent implements OnInit {
    @Input() price: any;
  precioConIVA:any=0;
  precioTotal:any=0;
  precio:any=0;
  descuento=0;
  id: number = 0;
  url: string = "";
  producto: Producto | undefined;
  prodItem: any = [];
  itemsArray: any = [];
  itemsArray2: any = [];
  plans: any = [];
  page:string='purchase';

  firstFormGroup = this._formBuilder.group( {
    firstCtrl: [ '', Validators.required ],
  } );
  secondFormGroup = this._formBuilder.group( {
    secondCtrl: [ '', Validators.required ],
  } );

  stepperOrientation: Observable<StepperOrientation>;
  planCopia: any;
  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();
  private _unsubscribeAll: Subject<any>;


  constructor( public dashboardService: DashboardService,
               private loadingService: LoadingService,
               private activateRoute: ActivatedRoute,
               private DashboardService:DashboardService,

               private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver ) {
    this.stepperOrientation = breakpointObserver
      .observe( '(min-width: 800px)' )
      .pipe( map( ( { matches } ) => ( matches ? 'horizontal' : 'vertical' ) ) );
      this._unsubscribeAll = new Subject();

  }


  ngOnInit(): void {
    setTimeout(()=>{                          

      this.precio=parseInt(this.price!);
    }, 500);  
   
    this.DashboardService.resumeDescuento
    .pipe(debounceTime(1000))
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: res => {
        console.log('resultado',res);
        this.descuento=res;
        this.getIVA();
      }
    })
 // setTimeout(()=>{                          
   // this.getIVA();
  //}, 2000);   
   }



  getIVA(){
   // console.log("precio en entero", precio)
    let iva=((this.precio)*(0.21));
    this.precio+=iva;
    console.log(this.descuento);
    if(this.descuento==0){
      this.precioConIVA=this.precio;
      this.precioTotal=this.precio;
    }
    else{
      let promocion=((this.precioConIVA)*(this.descuento)/100);
      this.precioTotal=this.precioConIVA-promocion;
      this.precioTotal=(this.precioTotal.toFixed(2));
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  
  }
} 