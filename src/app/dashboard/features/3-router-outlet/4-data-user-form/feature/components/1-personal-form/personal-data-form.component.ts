import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
        @Input() text:string='Continuar';
        @Input() id:any
        @Input() type:string="";

  @Output("sendPersonalData") sendPersonalData: EventEmitter<any> = new EventEmitter()
        producto: Producto | undefined;
        plans: any = [];
        arregloPersonas:any=[];
        longitudMaxima:number=1;
        telefono:any;
        codigo:any;
        //arregloPersonas:FormGroup<PersonalDataForm>=[];
        planCopia: any;
        cargado:boolean=false;
        isAddresQuestion:boolean=false;
        isBeneficiaryQuestion:boolean=false;
        public validationMessages = VALIDATION_MESSAGES;
        public provinces=provinces;
        public nationalities=nationalities;
        public documentType=documentType;
        public relationType=relationType;
        message="el porcentaje de ambos beneficiarios no puede superar 100";
        action="cerrar";
        porcentaje=0;

        public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

        public seguroBeneficiario=['Hogar','Bolso Protegido','Accidentes Personales ','Vida Temporal'];
        public seguroDomicilio=['Hogares'];
        maxLength: number=10;
        parentCount: any;
        titular: any=true;
        resultado: number=0;
  cod_area: number=0;
        constructor( private dashboardService:DashboardService,
                      private _router: Router ,
                      private _snackBar: MatSnackBar,
                      private activateRoute: ActivatedRoute,

        ) {

        }
        ngOnInit(): void {



            this.validadForm();

            this.dashboardService.products$.pipe(
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


        sumaPorcentajes(porcentaje:number):number{
          console.log('porcentaje ',parseInt(this.personalDataForm.value.percentage));
          porcentaje+=parseInt(this.personalDataForm.value.percentage);
            return porcentaje;
        }

        cargarObjetoForm(){
          let jsonForm = this.personalDataForm.getRawValue();
          let obj = {
            address:this.isAddresQuestion,
            beneficiary:this.isBeneficiaryQuestion,
            body: jsonForm,
          }
          this.sendPersonalData.emit(obj);
        }
        guardarFormBeneficiary(){

          this.porcentaje=this.dashboardService.calcularPorcentajeParcial();
          let rta=this.sumaPorcentajes(this.porcentaje);
          console.log('rta',rta);
          if(rta>100){
            this._snackBar.open(this.message,this.action);

          }

          else {
            this.cargarObjetoForm();
            if(rta==100){
               this._router.navigate(['dashboard/buy-form']);
             }
             else{
               this.validadForm();
             }
          }

      }
        guardarDatos(){
          console.log("tipooo",this.type);
          console.log("estatus",this.personalDataForm);

          if(this.personalDataForm.invalid){
            this.personalDataForm.markAllAsTouched();
            return;
          }
            let seguro=this.producto?.producto_descripcion!;
            //valida_adicional,valida_beneficiario, valida_domicilio
            if(this.seguroDomicilio.includes(seguro)){

              this.isAddresQuestion=true;
            }
            else{
              if(this.seguroBeneficiario.includes(seguro)){
                this.isBeneficiaryQuestion=true;
              }
            }

            if(this.type==="BENEFICIARIO"){
               this.guardarFormBeneficiary();
            }else{
              this.cargarObjetoForm();
              this.validadForm();
            }
            this.cargado=false;


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
            percentage: (this.type!=='TITULAR') ? new FormControl( '', [Validators.required,Validators.maxLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]): new FormControl('0'),
            relation:(this.type==='TITULAR') ? new FormControl('titular', [Validators.required]):new FormControl( '', [Validators.required]),
            lastname:new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20),Validators.pattern(/^[a-zA-Zñáéíóú ']+$/)]),
          name:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Zñáéíóú ]+$/)]),
          nationality:new FormControl('', [Validators.required]),
          document_type:new FormControl('', [Validators.required,]),
          document_number:new FormControl('', [Validators.required, Validators.minLength(7),Validators.maxLength(8),Validators.pattern(/^[0-9]*$/)]),
          id_genre:new FormControl('', [Validators.required]),
          birthdate:new FormControl('', [Validators.required]),
          address:new FormControl('', [Validators.required, Validators.minLength(1),Validators.pattern(/^[A-Za-z0-9ñáéíóú\s]+$/)]),
          number:new FormControl('', [Validators.required, Validators.maxLength(5),Validators.pattern(/^[0-9]*$/)]),
          floor:new FormControl('', [ Validators.maxLength(3),Validators.pattern(/^[A-Za-z0-9ñ\s]+$/)]),
          city:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z0-9 ñáéíóú\s]+$/)]),
          province:new FormControl('', [Validators.required]),
          zip:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(5) ,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          email:new FormControl('', [Validators.required, Validators.email ]),
          cod_area:new FormControl('', [Validators.required,Validators.maxLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          number_phone:new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/)])


             })
        }
        irArriba(){
          this.dashboardService.goTop.next(true);
        }

        limpiarTelefono(){
          this.personalDataForm.controls["number_phone"].reset();
          this.longitudMaxima=1;
          console.log(this.personalDataForm.controls["cod_area"].value);
          this.codigo=this.personalDataForm.controls["cod_area"].value;
          this.resultado=(10-this.codigo.toString().length)+1;
          this.personalDataForm.controls["number_phone"].removeValidators([Validators.maxLength(11)]);

          console.log('resultado',this.resultado);
        }





        validarMaximoPermitido(event:any):number{
          if(this.longitudMaxima!=10){
            this.resultado=0;

              let longitud =this.codigo.toString().length;

            let longitudTelefono=this.telefono.toString().length;

            this.longitudMaxima=(longitud+longitudTelefono)+1;
            return  this.longitudMaxima;
          }
          else{

                this.resultado=(this.longitudMaxima-this.codigo.toString().length);


            console.log("resultado",this.resultado);

            this.personalDataForm.controls["number_phone"].addValidators([Validators.maxLength(this.resultado)]);
           // this.personalDataForm.controls['number_phone'].clearValidators()

             this.personalDataForm.controls['number_phone'].updateValueAndValidity()

            this.resultado=0;
            this.longitudMaxima=1;
            return this.resultado;

          }

        }



        displayCounter(e:Event){
         this.parentCount = e;
         if(this.isAddresQuestion && this.parentCount){
          this.addressDataForm= new FormGroup({
          address:new FormControl('', [Validators.required, Validators.minLength(1)]),
          number:new FormControl('', [Validators.required, Validators.maxLength(5)]),
          floor:new FormControl('', [ Validators.maxLength(3)]),

          city:new FormControl('', [Validators.required, Validators.minLength(3)]),
          province:new FormControl('', [Validators.required, Validators.minLength(3)]),
          zip:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          email:new FormControl('', [Validators.required, Validators.email ]),
          cod_area:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          number_phone:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
          });
        }
        else{
          if(this.isAddresQuestion && !this.parentCount){
            //alert("ir a plan de pago");
            this._router.navigate(['dashboard/buy-form']);

          }
          else{
            console.log("es beneficiario");
            this.validadForm();

          }

        }
    }
  }
