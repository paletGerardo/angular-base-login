import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { VALIDATION_MESSAGES } from 'src/app/dashboard/shared/consts/validations.const';
import { provinces } from 'src/app/dashboard/shared/consts/provinces.const';
import { nationalities } from 'src/app/dashboard/shared/consts/nationalities.const';
import { documentType } from 'src/app/dashboard/shared/consts/document-type.const';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/dashboard/shared/models/productsResponse.model';
import { debounceTime } from 'rxjs/operators';
@Component( {
  selector: 'app-personal-data',
  templateUrl: './personal-data-form.component.html'
 // styleUrls: [ './product-purchase.component.scss' ]
} )
export class PersonalDataFormComponent implements OnInit {
        public personalDataForm: FormGroup<any> = this.dashboardService.formAlta.get('personalData') as FormGroup;
        public addressDataForm: FormGroup<any> = this.dashboardService.formAlta.get('otherAddress') as FormGroup;

        PersonalData: any;
        @Input() text:string='Ir a cargar datos del pago';
        @Input() id:any
        producto: Producto | undefined;
        plans: any = [];
        planCopia: any;
        domicilio:boolean=false;
        beneficiario:boolean=false;
        public validationMessages = VALIDATION_MESSAGES;
        public provinces=provinces;
        public nationalities=nationalities;
        public documentType=documentType;
        public products$: Observable<Producto[] | null> = new Observable<Producto[] | null>();

        //public seguroBeneficiario=[];
        public seguroDomicilio=['Hogar'];
        maxLength: number=10;
        codigoArea=0;
  parentCount: any;

        constructor( private dashboardService:DashboardService,
                      private _router: Router ,
                      private activateRoute: ActivatedRoute,

        ) {
    
        }
        ngOnInit(): void {
        
          
            console.log(this.personalDataForm.value);
            this.validadForm();
            console.log("las provincias son ",this.provinces);
            console.log("las natiionalities son ",this.nationalities);
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
        public getValidationFromControl( validation: any, elem: string ): any {
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
        }

    
  
        guardar(){
          console.log('domicilio agregado',this.addressDataForm);

        }  
  
        guardarDatos(){
          let seguro=this.producto?.producto_descripcion!;
          console.log('datos del usuario',this.personalDataForm);

         //   if(this.personalDataForm.invalid){
           //   this.personalDataForm.markAllAsTouched();
            //  return;
            ///}
           
              if(this.seguroDomicilio.includes(seguro)){
                console.log("pop up con pregunta de si asegura ese domicilio");
                this.domicilio=true;
              }
              else{
                console.log("pop up beneficiario");
                this.beneficiario=true;

              }
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

        validadForm(){
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
          province:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Z]+$/i)]),
          zip:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          email:new FormControl('', [Validators.required, Validators.email ]),
          cod_area:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          number_phone:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
          });
        }
    }
  }