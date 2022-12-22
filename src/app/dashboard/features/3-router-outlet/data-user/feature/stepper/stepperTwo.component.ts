import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Producto } from "../../../../../shared/models/productsResponse.model";
import { DashboardService } from "../../../../../dashboard.service";
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';


@Component( {
  selector: 'app-stepper2',
  templateUrl: './stepper.component.html',
  styleUrls: [ './stepper.component.scss' ]
} )
export class StepperTwoComponent implements OnInit {


 

  stepperOrientation: Observable<StepperOrientation>;
 

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