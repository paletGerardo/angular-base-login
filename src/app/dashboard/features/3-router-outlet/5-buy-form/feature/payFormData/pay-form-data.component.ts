import { Component, Input, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VALIDATION_MESSAGES } from 'src/app/dashboard/shared/consts/validations.const';
import { DashboardService } from 'src/app/dashboard/dashboard.service';



@Component( {
  selector: 'app-pay-form-data',
  templateUrl: './pay-form-data.component.html'

} )
export class PayFormDataComponent implements OnInit {
    public payDataForm: FormGroup<any> = this.dashboardService.formAlta.get('pay') as FormGroup;
    public validationMessages = VALIDATION_MESSAGES;
    @Input() text:string='Confirmar';
    public mask = {
        guide: true,
       
        mask: [ /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
      };


    constructor( private dashboardService:DashboardService,
        private activateRoute: ActivatedRoute,
    ) {

    }
    ngOnInit(): void {
      
       this.validarForm();
    }

    public getValidationPayFormControl( validation: any, elem: string ): any {
        //@ts-ignore
        return this.payDataForm.get( elem ).invalid && this.payDataForm.get( elem ).hasError( validation.type ) && ( this.payDataForm.get( elem ).dirty || this.payDataForm.get( elem ).touched )
  }

  guardar(){
    if(this.payDataForm.valid){
        alert("felicitaciones compro el seguro")
    }
   
  }

  validarForm(){
    this.payDataForm = new FormGroup({
        number_card:new FormControl ('',[Validators.required,Validators.minLength(12),Validators.maxLength(12)]),
        expiration:new FormControl ('',[Validators.required]),
        security_code:new FormControl ('',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]),
        cardholder:new FormControl ('',[Validators.required]),

     
    
  
       })
  }
   
}
