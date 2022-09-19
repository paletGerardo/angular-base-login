import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from './dashboard/shared/components/dialogs/error-dialog/error-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { NavComponent } from './dashboard/shared/components/nav/nav.component';
import { HomeComponent } from './dashboard/features/home/home.component';
import { BlockUIModule } from "ng-block-ui";

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    NavComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        BlockUIModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
