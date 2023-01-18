import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../../dashboard.service";
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalDataForm } from 'src/app/dashboard/shared/models/InfoForm/personal-data-form.model';
import { PayForm } from 'src/app/dashboard/shared/models/InfoForm/pay-form.model';
import { AddressForm } from 'src/app/dashboard/shared/models/InfoForm/address-form.model';
import { debounceTime } from 'rxjs/operators';

// [FER]: Esta clase deberia estar instanciada dentro del dashboardService



@Component( {
  selector: 'app-data-user',
  templateUrl: './data-user.component.html'

} )
export class DataUserComponent implements OnInit {

    id:any;
    public personalDataForm: FormGroup<any> = this.dashboardService.formAlta.get('personalData') as FormGroup;
    PersonalData: any;
    //principalForm: principalForm;
    titular:boolean=true;
    showAddressForm:boolean=false;
    showBeneficiaryForm:boolean=false;
    isAddressQuestion:boolean=false;
    isBeneficiaryQuestion:boolean=false;
    showAdicionalForm: boolean=false;
    isAdicionalQuestion: boolean=false;
    constructor( private dashboardService:DashboardService,
                 private activateRoute: ActivatedRoute,
                 private _router:Router,
    ) {
     // this.principalForm=new principalForm();
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
      let tipo=""
    console.log('el evento muchacho',$event);
    this.dashboardService.addPersonalData($event,tipo);
    // [FER]: paso 4 - push de los datos personales
    //this.principalForm.personalData!.push($event);
    this.isAddressQuestion=$event.address;
    this.isBeneficiaryQuestion=$event.beneficiary;
    if(this.isBeneficiaryQuestion){
      this.showBeneficiaryForm=false;

    }
    this.titular=false;
    console.log(this.isAddressQuestion);
   // console.log("arreglo cargado?", this.principalForm.personalData);
    // tiene adicional

    // [FER]: paso 5 - logica para mostrar formularios adicionales
   // this.isAditional =true;
    // else
   // this.isBeneficiary = true;
    // else
    ///this.isAddresQuestion = true;
  }
  saveAddressData($event: any){
    let tipo="domicilio";
    console.log('el nuevo domicilio',$event);
    this.dashboardService.addPersonalData($event,tipo);
    //this.principalForm.domicilioAsegurado=$event.body;
   // console.log('domicilio del cliente', this.principalForm.domicilioAsegurado);
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
    verificarRespuestaBeneficiario($event:any) {
        console.log("respuesta beneficiario",$event);      
          this.isBeneficiaryQuestion=false;
          this.showBeneficiaryForm=$event;
          if(!$event){
            this.showBeneficiaryForm=!this.showBeneficiaryForm;
          }
          else{
            this._router.navigate(['dashboard/buy-form']);
          }
    }
    validarRespuestaAdicional($event:any) {
      console.log("respuesta adicional",$event);      
        this.isAdicionalQuestion=false;
        this.showAdicionalForm=$event;
        if(!$event){
          this.showAdicionalForm=!this.showAdicionalForm;
        }
        else{
          this._router.navigate(['dashboard/buy-form']);
        }
  }



}
