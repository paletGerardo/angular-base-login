import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginRootComponent } from './components/login-root.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {NotRegisteredDialogComponent} from "./components/not-registered-dialog/not-registered-dialog.component";
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';




@NgModule({
    declarations: [
        LoginRootComponent,
        LoginComponent,
        LoginFormComponent,
      NotRegisteredDialogComponent,
    ],
  imports: [SharedModule,
    LoginRoutingModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule]
})
export class LoginModule {}
