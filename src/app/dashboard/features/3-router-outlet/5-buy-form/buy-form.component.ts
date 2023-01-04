import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../../dashboard.service";
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component( {
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html'

} )
export class BuyFormComponent implements OnInit {
   

    id:any;
    public personalDataForm: FormGroup<any> = this.dashboardService.formAlta.get('personalData') as FormGroup;
    PersonalData: any;
    constructor( private dashboardService:DashboardService,
                 private activateRoute: ActivatedRoute,
    ) {

        }
        ngOnInit(): void {
       
        }
}        
