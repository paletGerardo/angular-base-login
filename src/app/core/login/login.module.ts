import { NgModule } from '@angular/core';
import { SharedModule } from '../../dashboard/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginRootComponent } from './components/login-root.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { NotRegisteredDialogComponent } from "./components/not-registered-dialog/not-registered-dialog.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
    NotRegisteredDialogComponent,
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
