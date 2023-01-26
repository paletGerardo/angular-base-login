import { Component, Input, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VALIDATION_MESSAGES } from 'src/app/dashboard/shared/consts/validations.const';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';



@Component( {
  selector: 'app-pay-form-data',
  templateUrl: './pay-form-data.component.html'

} )
export class PayFormDataComponent implements OnInit {
    public payDataForm: FormGroup<any> = this.dashboardService.formAlta.get('pay') as FormGroup;
    public validationMessages = VALIDATION_MESSAGES;
    @Input() text:string='Confirmar';
    month: string="";
    year: string="";
    public mask = {
        guide: true,
       
        mask: [ /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
      };
      dialogRef: any;
      compra: boolean=false;


    constructor( private dashboardService:DashboardService,
        private activateRoute: ActivatedRoute,
        private _router: Router,

          private _matDialog: MatDialog,
    ) {

    }
    ngOnInit(): void { 
       this.validarForm();
       this.dashboardService.goTop.subscribe( {
        next: data => {
         console.log("data del buy form" ,data)
          if(data){
            
            document.getElementById('formPrincipal')?.scrollIntoView();
          }
        },
      })
    }

    public getValidationPayFormControl( validation: any, elem: string ): any {
        //@ts-ignore
        return this.payDataForm.get( elem ).invalid && this.payDataForm.get( elem ).hasError( validation.type ) && ( this.payDataForm.get( elem ).dirty || this.payDataForm.get( elem ).touched )
  }

  addSlash(event:any) {
    if (event.target.value.length === 2) {
      event.target.value += '/';
    }
  }

  clearData(event:any) {
    if (event.keyCode === 8 && event.target.value.length === 3) {
      event.target.value = event.target.value.slice(0, 2);
    }
  }

  guardar(){
  let tarjetaPrueba=this.payDataForm.value.number_card;  
  if(this.payDataForm.invalid){
    this.payDataForm.markAllAsTouched();
    return;
  }
   if(tarjetaPrueba!=="3577525912345"){
      if(this.payDataForm.valid){
        this.compra=true;
        this._router.navigate(['dashboard/success-or-error-pay']);
      }
    }
    else{
      this._router.navigate(['dashboard/success-or-error-pay']);

    }
    this.dashboardService.isCompra.next(this.compra);

  }

  validarForm(){
    this.payDataForm = new FormGroup({
        number_card:new FormControl ('',[Validators.required,Validators.minLength(13),Validators.maxLength(18),Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
        expiration:new FormControl ('',[Validators.required,Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]),
        security_code:new FormControl ('',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
        cardholder:new FormControl ('',[Validators.required,Validators.pattern(/^[a-zA-Zñáéíóú ]+$/)]),
       })
  }

}
