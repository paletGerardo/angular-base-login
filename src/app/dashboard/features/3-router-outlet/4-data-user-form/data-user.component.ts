import { Component, Input, OnInit } from '@angular/core';

import { DashboardService } from "../../../dashboard.service";

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component( {
  selector: 'app-data-user',
  templateUrl: './data-user.component.html'
 // styleUrls: [ './product-purchase.component.scss' ]

} )
export class DataUserComponent implements OnInit {
   

    id:any;
    public personalDataForm: FormGroup<any> = this.dashboardService.formAlta.get('personalData') as FormGroup;
    PersonalData: any;
    constructor( private dashboardService:DashboardService,
                 private activateRoute: ActivatedRoute,
    ) {

}
    ngOnInit(): void {
        this.activateRoute.params.subscribe(
            ( res: any ) => {
              this.id = res.id;
              console.log(this.id);
            } );
    }

}    