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
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: [ './form-email.component.scss' ]
} )
export class FormEmailComponent implements OnInit {
  id: number = 0;
  url: string = "";
  producto: Producto | undefined;
  prodItem: any = [];
  itemsArray: any = [];
  itemsArray2: any = [];
  plans: any = [];
  page:string='purchase';

  userEmail = new FormGroup({
    Email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    } );


  stepperOrientation: Observable<StepperOrientation>;
  planCopia: any;
  public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

  //public products$: Producto[]=[];
  precio: any;
  titulo: any;
  risks: any = [];
  riskCopia:any=[];

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

} 