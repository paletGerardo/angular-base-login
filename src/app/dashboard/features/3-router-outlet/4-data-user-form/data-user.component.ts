import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../../dashboard.service";
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalDataForm } from 'src/app/dashboard/shared/models/InfoForm/personal-data-form.model';
import { PayForm } from 'src/app/dashboard/shared/models/InfoForm/pay-form.model';
import { AddressForm } from 'src/app/dashboard/shared/models/InfoForm/address-form.model';
import { debounceTime } from 'rxjs/operators';

// [FER]: Esta clase deberia estar instanciada dentro del dashboardService
  class principalForm {
  personalData: PersonalDataForm[] =[];
  domicilioAsegurado: AddressForm | undefined;
  datosPago: PayForm | undefined
}


@Component( {
  selector: 'app-data-user',
  templateUrl: './data-user.component.html'

} )
export class DataUserComponent implements OnInit {

    id:any;
    public personalDataForm: FormGroup<any> = this.dashboardService.formAlta.get('personalData') as FormGroup;
    PersonalData: any;
    principalForm: principalForm;
    titular:boolean=true;
    showAddressForm:boolean=false;
    showBeneficiaryForm:boolean=false;
    isAddressQuestion:boolean=false;
    isBeneficiaryQuestion:boolean=false;
    constructor( private dashboardService:DashboardService,
                 private activateRoute: ActivatedRoute,
                 private _router:Router,
    ) {
      this.principalForm=new principalForm();
      }
    ngOnInit(): void {
        this.activateRoute.params.subscribe(
            ( res: any ) => {
              this.id = res.id;
              console.log(this.id);
            } );

            this.dashboardService.goTop
            .subscribe( {
              next: data => {
                console.log('la dataaaaa',data);
                if(data){
                  
                  document.getElementById('formPrincipal')?.scrollIntoView();
                }
              },
            })
    }

    savePersonalData($event: any) {
    console.log('el evento muchacho',$event);
    // [FER]: paso 4 - push de los datos personales
    this.principalForm.personalData!.push($event);
    this.isAddressQuestion=$event.address;
    this.isBeneficiaryQuestion=$event.beneficiary;
    this.titular=false;
    console.log(this.isAddressQuestion);
    console.log("arreglo cargado?", this.principalForm.personalData);
    // tiene adicional

    // [FER]: paso 5 - logica para mostrar formularios adicionales
   // this.isAditional =true;
    // else
   // this.isBeneficiary = true;
    // else
    ///this.isAddresQuestion = true;
  }
  saveAddressData($event: any){
    console.log('el nuevo domicilio',$event);
    this.principalForm.domicilioAsegurado=$event.body;
    console.log('domicilio del cliente', this.principalForm.domicilioAsegurado);
    this._router.navigate(['dashboard/buy-form']);

  }


  verificarRespuesta($event:any) {
    console.log("respuesta",$event);      
      this.isAddressQuestion=false;
      this.showAddressForm=$event;
      if(!$event){
        this.showAddressForm=!this.showAddressForm;
      }
      else{
        this._router.navigate(['dashboard/buy-form']);
      }
      
    
   

  }
}
