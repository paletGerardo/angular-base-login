import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from '../dashboard/features/1-nav/nav.component';
import { HomeComponent } from '../dashboard/features/2-router-outlet/2-home/home.component';
import { BlockUIModule } from "ng-block-ui";
import { DashboardModule } from "../dashboard/dashboard.module";

@NgModule( {
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BlockUIModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    DashboardModule
  ],
  providers: [],
  exports: [
    NavComponent
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
