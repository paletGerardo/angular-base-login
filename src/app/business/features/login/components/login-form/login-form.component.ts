import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {UserModel} from "../../model/user.model";
import {AuthService} from "../../services/auth.service";
import {NotRegisteredDialogComponent} from "../not-registered-dialog/not-registered-dialog.component";


@Component({
  selector: 'ce-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  user: UserModel | undefined;
  recordarme = false;
  hidePassword = true;
  loginForm = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loginForm = this.buildForm();
    if(localStorage.getItem('email')){
      // @ts-ignore
      this.user.mail = <string>localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  buildForm(): FormGroup {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      remember: [false],
    });
    return form;
  }

  onTogglePasswordVisibilityClick(): void {
    this.hidePassword = !this.hidePassword;
  }


  validationMessages? = {
    email:  [
      {
        type:  'required',
        message:  'Ingrese un email correcto'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña debe de ser más de 6 letras'
      }
    ],
  };


  onLoginClick(): void {
    console.log(this.authService.login)

    // @ts-ignore
    this.loginForm.markAsUntouched();

    // @ts-ignore
    if (!this.loginForm.valid) {
      const errors: string[] = [];

      // @ts-ignore
      Object.keys(this.loginForm.controls).forEach((k) => {
        // @ts-ignore
        const control = this.loginForm.controls[k];
        // @ts-ignore
        const errorMessages = this.validationMessages[k] as {
          type: string;
          message: string;
        }[];

        if (!control.errors) {
          return;
        }

        Object.keys(control.errors).forEach((e) => {
          const errorMessage = errorMessages.find((em) => em.type === e);

          // @ts-ignore
          errors.push(errorMessage.message);
        });
      });
    }

    //this.loadingService.tryToStartLoading();

    this.authService

      .login(
        // @ts-ignore
        this.loginForm.value.email,
        // @ts-ignore
        this.loginForm.value.password,
      ).subscribe((loginResponse : any) => {
        //this.loadingService.tryToStopLoading()
        console.log(loginResponse);
        if(loginResponse.header){
          console.log(loginResponse)
          this.router.navigate(['/home']);
          this.dialog.closeAll();
        }
      },
      (error:any) =>{
        console.log('error')
        this.dialog.open(NotRegisteredDialogComponent, {
          width: '350px',
          data: 'Los datos ingresados no son válidos',
          restoreFocus: false
        });

      }
    );
  }

  ngOnDestroy(): void {}

}
