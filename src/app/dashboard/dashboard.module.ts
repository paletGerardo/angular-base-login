import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AppModule } from "../app-root/app.module";
import { FooterComponent } from "./features/3-footer/footer.component";
import { AppRoutingModule } from "../app-root/app-routing.module";



@NgModule( {
  declarations: [
    DashboardComponent],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class DashboardModule { }
