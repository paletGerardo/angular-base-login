import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../../dashboard.service";
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// [FER]: Esta interface deberia estar instanciada dentro del dashboardService
class principalForm {
  personalData: PersonalData[];
  domicilioAsegurado: Domicilio;
  datosPago: DatosPago
}


@Component( {
  selector: 'app-data-user',
  templateUrl: './data-user.component.html'

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

  savePersonalData($event: any) {
    // [FER]: paso 4 - push de los datos personales
    this.principalForm.personalData.push($event);
    // tiene adicional

    // [FER]: paso 5 - logica para mostrar formularios adicionales
    this.isAditional =true;
    // else
    this.isBeneficiary = true;
    // else
    this.isAddresQuestion = true;
  }


  verificarRespuesta() {

  }
}
