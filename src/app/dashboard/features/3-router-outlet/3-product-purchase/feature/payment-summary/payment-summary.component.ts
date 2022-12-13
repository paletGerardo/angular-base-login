import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Producto } from "../../../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';



@Component( {
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: [ './payment-summary.component.scss' ]
} )
export class PaymentSummaryComponent implements OnInit {
    @Input() price: string | undefined;
  precioConIVA=0;
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
    this.DashboardService.resumeDescuento
    .pipe(debounceTime(1000))
    .subscribe({
      next: res => {
        console.log('resultado',res);
        this.descuento=res;
        this.getIVA();
      }
    })
    setTimeout(()=>{                          
      this.getIVA();
  }, 1000);   
   }



  getIVA(){
   // console.log("precio--Z",this.price);
    let precio=parseInt(this.price!);
   // console.log("precio en entero", precio)
    let iva=((precio)*(0.21));
    precio+=iva;
    if(this.descuento==0){
      this.precioConIVA=precio;
    }
    else{
      let promocion=((this.precioConIVA)*(this.descuento)/100);
      this.precioConIVA-=promocion;

    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  
  }
} 