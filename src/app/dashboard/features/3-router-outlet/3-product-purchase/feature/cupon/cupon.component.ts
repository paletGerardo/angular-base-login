import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Producto } from "../../../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';


@Component( {
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: [ './cupon.component.scss' ]
} )
export class CuponComponent implements OnInit {
  id: number = 0;
  descuento: any = 0;
  clicked:boolean=false;

  firstFormGroup = this._formBuilder.group( {
    firstCtrl: [ '', Validators.required ],
  } );
  secondFormGroup = this._formBuilder.group( {
    secondCtrl: [ '', Validators.required ],
  } );

  stepperOrientation: Observable<StepperOrientation>;
  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  formularioCupon = new FormGroup({
    descuento: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    } );

  constructor( public dashboardService: DashboardService,
               private loadingService: LoadingService,
               private activateRoute: ActivatedRoute,
             
               private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver ) {
    this.stepperOrientation = breakpointObserver
      .observe( '(min-width: 800px)' )
      .pipe( map( ( { matches } ) => ( matches ? 'horizontal' : 'vertical' ) ) );
  }


  ngOnInit(): void {
  }

  cuponDescuento(){
    this.clicked=true;
    this.descuento=this.formularioCupon.value.descuento;
    console.log('formulario',this.descuento);
    this.dashboardService.resumeDescuento.next(this.descuento);

  }


} 