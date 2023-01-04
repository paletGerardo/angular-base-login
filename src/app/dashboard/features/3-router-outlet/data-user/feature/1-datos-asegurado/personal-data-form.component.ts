import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { VALIDATION_MESSAGES } from 'src/app/dashboard/shared/consts/validations.const';
import { provinces } from 'src/app/dashboard/shared/consts/provinces.const';
import { relationType } from 'src/app/dashboard/shared/consts/relation-type.conts';
import { nationalities } from 'src/app/dashboard/shared/consts/nationalities.const';
import { documentType } from 'src/app/dashboard/shared/consts/document-type.const';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/dashboard/shared/models/productsResponse.model';
import { debounceTime } from 'rxjs/operators';
import { PersonalDataForm } from 'src/app/dashboard/shared/models/InfoForm/personal-data-form.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component( {
  selector: 'app-personal-data',
  templateUrl: './personal-data-form.component.html',
  styleUrls: [ './personal-data-form.component.scss' ]
} )
export class PersonalDataFormComponent implements OnInit {
        public personalDataForm: FormGroup<any> = this.dashboardService.formAlta.get('personalData') as FormGroup;
        public addressDataForm: FormGroup<any> = this.dashboardService.formAlta.get('otherAddress') as FormGroup;
        public beneficiaryForm: FormGroup<any> = this.dashboardService.formAlta.get('beneficiary') as FormGroup;

        PersonalData: any;
        formNoTitular:boolean=false;
        @Input() text:string='Ir a cargar datos del pago';
        @Input() id:any
        producto: Producto | undefined;
        plans: any = [];
        arregloPersonas:any=[];
        //arregloPersonas:FormGroup<PersonalDataForm>=[];
        planCopia: any;
        cargado:boolean=false;
        domicilio:boolean=false;
        beneficiario:boolean=false;
        public validationMessages = VALIDATION_MESSAGES;
        public provinces=provinces;
        public nationalities=nationalities;
        public documentType=documentType;
        public relationType=relationType;
        message="el porcentaje de ambos beneficiarios no puede superar 100";
        action="cerrar";
        porcentaje=0;

        public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

        public seguroBeneficiario=['Bolso Protegido','Accidentes Personales ','Vida Temporal'];
        public seguroDomicilio=['Hogar'];
        maxLength: number=10;
        parentCount: any;
        titular: any=true;
        constructor( private dashboardService:DashboardService,
                      private _router: Router ,
                      private _snackBar: MatSnackBar,
                      private activateRoute: ActivatedRoute,

        ) {
    
        }
        ngOnInit(): void {
        
          
            console.log(this.personalDataForm.value);
            this.validadForm();
            //console.log("las provincias son ",this.provinces);
            //console.log("las natiionalities son ",this.nationalities);
            this.dashboardService.getProducts()
            .pipe(
              debounceTime( 1000 )
            )
            .subscribe( ( data: any ) => {
              this.products$ = data;
              console.log( this.products$ );
              this.getProduct();
            });  


        }
        public getValidationPersonalFromControl( validation: any, elem: string ): any {
              //@ts-ignore
              return this.personalDataForm.get( elem ).invalid && this.personalDataForm.get( elem ).hasError( validation.type ) && ( this.personalDataForm.get( elem ).dirty || this.personalDataForm.get( elem ).touched )
        }
        public getValidationAdressFromControl( validation: any, elem: string ): any {
          //@ts-ignore
          return this.addressDataForm.get( elem ).invalid && this.addressDataForm.get( elem ).hasError( validation.type ) && ( this.addressDataForm.get( elem ).dirty || this.addressDataForm.get( elem ).touched )
        }
        public getValidationBeneficiaryFromControl( validation: any, elem: string ): any {
          //@ts-ignore
          return this.beneficiaryForm.get( elem ).invalid && this.beneficiaryForm.get( elem ).hasError( validation.type ) && ( this.beneficiaryForm.get( elem ).dirty || this.beneficiaryForm.get( elem ).touched )
        }

        getProduct( ) {
          this.activateRoute.params.subscribe(
            ( res: any ) => {
              this.id = res.id;
              console.log('el id es',this.id);
            } );
          this.products$.forEach( ( produc: any ) => {
            if ( produc.id_producto ==this.id ) {
              this.producto = produc;
              this.plans = this.producto?.planes;
            }
          } );
        //  this.ordenarPlanes();
          this.planCopia = this.plans[0];
        }

    
  
        guardar(){
          console.log('domicilio agregado',this.addressDataForm);
          //preguntar este caso..
          this.arregloPersonas.push(this.addressDataForm);

        }
        
        irArriba(){
          console.log('llego aca');
          document.getElementById('formPrincipal')?.scrollIntoView();
        }


        guardarFormBeneficiary(){
          let seguro=this.producto?.producto_descripcion!;

            if(this.seguroBeneficiario.includes(seguro)){
              console.log("pop up beneficiario");
              this.beneficiario=true;
              if(this.porcentaje==0){
                if(parseInt(this.personalDataForm.value.percentage)<100){
                  this.porcentaje+=parseInt(this.personalDataForm.value.percentage);
                  this.arregloPersonas.push(this.personalDataForm);
                  console.log("arreglo de personas",this.arregloPersonas);
                  console.log("ir a proxima etapa");
                  this.beneficiario=true;
                  this.parentCount=!this.parentCount;
                  this.validadForm();
                }
                else{
                  if(parseInt(this.personalDataForm.value.percentage)==100){
                    alert("se cargo el 100%");
                  }
                  else{
                    this._snackBar.open(this.message,this.action);
                  }

                }

              }
          else{
            let resultadoParcial=this.porcentaje+parseInt(this.personalDataForm.value.percentage);
            if(resultadoParcial<101){
              this.porcentaje+=parseInt(this.personalDataForm.value.percentage);
              this.arregloPersonas.push(this.personalDataForm);
              console.log("arreglo de personas",this.arregloPersonas);
              if (this.porcentaje==100){
                console.log("aca se termino");
                alert('ir a plan de pago');   
              }
              else{
                this.beneficiario=true;
                this.parentCount=!this.parentCount;
                this.validadForm();
              }
            }
            else{
              if(this.porcentaje==100){
                console.log("aca se termino");
                alert('ir a plan de pago');
              }
              else{
                this._snackBar.open(this.message,this.action);
              }
            }
          
          }
        }  
      }
        guardarDatos(){
          this.cargado=true;
          console.log("estatus",this.personalDataForm);

          if(this.personalDataForm.invalid){
            this.personalDataForm.markAllAsTouched();
            return;
          }
          if(this.titular){
            this.arregloPersonas.push(this.personalDataForm);
            console.log("arreglo de personas",this.arregloPersonas);
            this.formNoTitular=true;
            let seguro=this.producto?.producto_descripcion!;
            if(this.seguroDomicilio.includes(seguro)){
              console.log("pop up con pregunta de si asegura ese domicilio");
              this.domicilio=true;
            }
            else{
              if(this.seguroBeneficiario.includes(seguro)){
                console.log("pop up beneficiario");
                this.beneficiario=true;
              }  
              else{
                alert("plan de pago");
              }  
  
            }
            this.titular=false;

          }
          else{
            this.guardarFormBeneficiary();
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

        validadForm(){
          this.personalDataForm = new FormGroup({
            percentage: (!this.titular) ? new FormControl( '', [Validators.required,Validators.maxLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]): new FormControl('0'),
            relation:(this.titular) ? new FormControl('titular', [Validators.required]):new FormControl( '', [Validators.required]),
            lastname:new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20),Validators.pattern('[A-Za-z].*')]),
          name:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z]+$/)]),
          nationality:new FormControl('', [Validators.required]),
          document_type:new FormControl('', [Validators.required,]),
          document_number:new FormControl('', [Validators.required, Validators.minLength(7),Validators.maxLength(8),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          id_genre:new FormControl('', [Validators.required]),
          birthdate:new FormControl('', [Validators.required]),
          address:new FormControl('', [Validators.required, Validators.minLength(3)]),
          number:new FormControl('', [Validators.required, Validators.maxLength(5)]),
          city:new FormControl('', [Validators.required, Validators.minLength(3)]),
          province:new FormControl('', [Validators.required]),
          zip:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          email:new FormControl('', [Validators.required, Validators.email ]),
          cod_area:new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          number_phone:new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(7),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
            
        
             })
        }
       // isClicked(){
         
         //   this.maxLength-=this.codigoArea.toString().length;
           // console.log(this.maxLength);
          
         // this.maxLength=10;
          
        //}
        displayCounter(e:Event){

         this.parentCount = e;
         if(this.domicilio && this.parentCount){
          this.addressDataForm= new FormGroup({
          address:new FormControl('', [Validators.required, Validators.minLength(3)]),
          number:new FormControl('', [Validators.required, Validators.minLength(3)]),
          city:new FormControl('', [Validators.required, Validators.minLength(3)]),
          province:new FormControl('', [Validators.required, Validators.minLength(3)]),
          zip:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          email:new FormControl('', [Validators.required, Validators.email ]),
          cod_area:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          number_phone:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
          });
        }
        else{
          if(this.domicilio && !this.parentCount){
            alert("ir a plan de pago");
          }
          else{
            console.log("es beneficiario");
            this.validadForm();

          }
          
        }
    }
  }