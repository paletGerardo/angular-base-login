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
              lastname:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z \-\']+')]),
            name:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z]+$/)]),
            nationality:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[-_a-zA-Z0-9]*')]),
            document_type:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Z]+$/i)]),
            document_number:new FormControl('', [Validators.required, Validators.minLength(7),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            id_genre:new FormControl('', [Validators.required, Validators.minLength(3)]),
            birthdate:new FormControl('', [Validators.required, Validators.minLength(3)]),
            address:new FormControl('', [Validators.required, Validators.minLength(3)]),
            number:new FormControl('', [Validators.required, Validators.minLength(3)]),
            city:new FormControl('', [Validators.required, Validators.minLength(3)]),
            province:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Z]+$/i)]),
            zip:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            email:new FormControl('', [Validators.required, Validators.email ]),
            cod_area:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            number_phone:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
              
          
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
              return this.personalDataForm.get( elem ).invalid && this.personalDataForm.get( elem ).hasError( validation.type ) && ( this.personalDataForm.get( elem ).dirty || this.personalDataForm.get( elem ).touched )
            }
             
          
  
        guardarDatos(){
            if(this.personalDataForm.invalid){
              this.personalDataForm.markAllAsTouched();
              return;
            }
            else{
              console.log('datos del usuario',this.personalDataForm);
              alert(this.personalDataForm);

            }
       
          

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
