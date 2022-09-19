import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from '../dashboard/shared/components/dialogs/error-dialog/error-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from '../dashboard/shared/components/nav/nav.component';
import { HomeComponent } from '../dashboard/features/home/home.component';
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
        ReactiveFormsModule,
        BlockUIModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
