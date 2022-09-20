import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./features/3-footer/footer.component";
import { NavComponent } from "./features/1-nav/nav.component";
import { AppRoutingModule } from "../app-root/app-routing.module";



@NgModule( {
  declarations: [
    FooterComponent,
    NavComponent

  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    
  ]
})
export class DashboardModule { }
