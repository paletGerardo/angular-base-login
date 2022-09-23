import { NgModule } from '@angular/core';
import { SharedModule } from '../../dashboard/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginRootComponent } from './components/login-root.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFormComponent } from "./components/registration/registration-form/registration-form.component";
import { LoginFormComponent } from "./components/login/login-form/login-form.component";
import { MaterialModule } from "../material/material.module";


@NgModule( {
  declarations: [
    LoginRootComponent,
    LoginComponent,
    LoginFormComponent,
    RegistrationComponent,
    RegistrationFormComponent,
  ],
  imports: [
    SharedModule,
    MaterialModule,
    LoginRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
} )
export class LoginModule {
}
