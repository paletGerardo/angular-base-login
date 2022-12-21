import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { LoadingService } from 'src/app/core/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { VALIDATION_MESSAGES } from 'src/app/dashboard/shared/consts/validations.const';


@Component( {
  selector: 'app-personal-data',
  templateUrl: './personal-data-form.component.html'
 // styleUrls: [ './product-purchase.component.scss' ]
} )
export class PersonalDataFormComponent implements OnInit {
        public personalDataForm: FormGroup<any> = this.dashboardService.formAlta.get('personalData') as FormGroup;
        PersonalData: any;
        @Input() text:string='Ir a cargar datos del pago';
        @Input() id:any

        public validationMessages = VALIDATION_MESSAGES;


        constructor( private dashboardService:DashboardService,
                      private _router: Router ,
                      private activateRoute: ActivatedRoute,

        ) {
    
        }
        ngOnInit(): void {
            console.log(this.personalDataForm.value);
            this.personalDataForm = new FormGroup({
              lastname:new FormControl('', [Validators.required, Validators.minLength(3)]),
            name:new FormControl('', [Validators.required, Validators.minLength(3)]),
            nationality:new FormControl('', [Validators.required, Validators.minLength(3)]),
            document_type:new FormControl('', [Validators.required, Validators.minLength(3)]),
            document_number:new FormControl('', [Validators.required, Validators.minLength(3)]),
            id_genre:new FormControl('', [Validators.required, Validators.minLength(3)]),
            birthdate:new FormControl('', [Validators.required, Validators.minLength(3)]),
            address:new FormControl('', [Validators.required, Validators.minLength(3)]),
            number:new FormControl('', [Validators.required, Validators.minLength(3)]),
            city:new FormControl('', [Validators.required, Validators.minLength(3)]),
            province:new FormControl('', [Validators.required, Validators.minLength(3)]),
            zip:new FormControl('', [Validators.required, Validators.minLength(3)]),
            email:new FormControl(),
            cod_area:new FormControl('', [Validators.required, Validators.minLength(3)]),
            number_phone:new FormControl('', [Validators.required, Validators.minLength(3)])
              
          
               })
                  //  this.PersonalData = Object.keys(this.personalDataForm.value);
           // console.log(this.PersonalData);
            /*const arreglado = ['nombre','apellido' ,'tipo de dni' ,'dni',,'genero','fecha de nacimiento', 'email','direccion','telefono'];
            for (let i = 0; i < arreglado.length; i++) {
               this.PersonalData[i]=arreglado[i];
              }*/
              console.log("arreglo terminado",this.PersonalData) ; 
            }
            public getValidationFromControl( validation: any, elem: string ): any {
              //@ts-ignore
              return this.personalDataForm.get( elem ).hasError( validation.type ) && ( this.personalDataForm.get( elem ).dirty || this.personalDataForm.get( elem ).touched )
            }
             
          
  
        guardarDatos(){
          console.log('datos del usuario',this.personalDataForm);
        }
        volver(){
          this.activateRoute.params.subscribe(
            ( res: any ) => {
              this.id = res.id;
              console.log('el id es',this.id);
            } );
          let ruta = 'dashboard/product-purchase/'+ this.id;
          console.log("ruta",ruta);
          this._router.navigate([ruta]);
        }
    }
