import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthenticated } from "../../model/userAuthenticated";
import { LoginService } from "../../services/login.service";
import { NotRegisteredDialogComponent } from "../not-registered-dialog/not-registered-dialog.component";
import { validationMessages } from "../../consts/validations.const";
import { ResponseLogin } from "../../model/responseLogin";
import { INTERNAL_ROUTES } from "../../../../../core/routes/internal.routes";
import { REGEX_CONSTANTS } from "../../../../../core/regx/regex.constants";


@Component( {
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.scss' ]
} )
export class LoginFormComponent implements OnInit {

  @Output() dataLoginEmitter = new EventEmitter();
  hidePassword = true;
  loginForm = new FormGroup( {} );
  public validationMessages = validationMessages;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.buildForm();
  }

  buildForm(): FormGroup {
    const form = this.fb.group( {
      email: [ 'nimarchi@angema.com.ar', [ Validators.required, Validators.pattern( REGEX_CONSTANTS.email ) ] ],
      password: [ '120380.nimarchi', [ Validators.required, Validators.pattern( REGEX_CONSTANTS.password ) ] ],
      remember: [ false ],
    } );
    return form;
  }

  onTogglePasswordVisibilityClick(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLoginClick(): void {
    this.loginForm.markAsUntouched();
    this.isFormValid();
    const email =  this.loginForm.get( 'email' )?.value;
    const password = this.loginForm.get( 'password' )?.value;
    this.dataLoginEmitter.emit(
      {
        email: email,
        password: password
      }
    );
  }




  private isFormValid(): void {
    if ( !this.loginForm.valid ) {
      const errors: string[] = [];
      Object.keys( this.loginForm.controls ).forEach( ( k ) => {
        const control = this.loginForm.controls[k];
//        const errorMessages = this.validationMessages[k] as {
//          type: string;
//          message: string;
//        }[];

        if ( !control.errors ) {
          return;
        }

        Object.keys( control.errors ).forEach( ( e ) => {
//          const errorMessage = errorMessages.find( ( em ) => em.type === e );
//          errors.push( errorMessage.message );
        } );
      } );
    }
  }
}
