import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VALIDATION_MESSAGES } from 'src/app/dashboard/shared/consts/validations.const';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { provinces } from 'src/app/dashboard/shared/consts/provinces.const';
@Component( {
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: [ './address-form.component.scss' ]
} )

export class AddressFormComponent implements OnInit {
    @Output("sendPersonalData") sendPersonalData: EventEmitter<any> = new EventEmitter()

    public addressDataForm: FormGroup<any> = this.dashboardService.formAlta.get('otherAddress') as FormGroup;
    public validationMessages = VALIDATION_MESSAGES;
    public provinces=provinces;

    constructor( private dashboardService:DashboardService,
        
        ) {

        }
    ngOnInit(): void {
        this.validarForm();
    }
    public getValidationAdressFromControl( validation: any, elem: string ): any {
        //@ts-ignore
        return this.addressDataForm.get( elem ).invalid && this.addressDataForm.get( elem ).hasError( validation.type ) && ( this.addressDataForm.get( elem ).dirty || this.addressDataForm.get( elem ).touched )
    }

    validarForm(){
        this.addressDataForm= new FormGroup({
            address:new FormControl('', [Validators.required, Validators.minLength(1),Validators.pattern(/^[A-Za-z0-9ñáéíóú\s]+$/)]),
            number:new FormControl('', [Validators.required, Validators.maxLength(5),Validators.pattern(/^[0-9]*$/)]),
            floor:new FormControl('', [ Validators.maxLength(3),Validators.pattern(/^[A-Za-z0-9ñ\s]+$/)]),
            city:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z0-9 ñáéíóú\s]+$/)]),
            province:new FormControl('', [Validators.required]),
            zip:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(5) ,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
           
            });

    }

    guardarDatos(){
        console.log("estatus",this.addressDataForm);

        if(this.addressDataForm.invalid){
          this.addressDataForm.markAllAsTouched();
          return;
        }
            console.log('domicilio agregado',this.addressDataForm);
            //preguntar este caso..
            let jsonForm = this.addressDataForm.getRawValue();
        let obj = {
          
          body: jsonForm,
        }
        this.sendPersonalData.emit(obj);
         // this.guardarFormBeneficiary();
      }
      

}
