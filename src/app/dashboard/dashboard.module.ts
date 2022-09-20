import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./features/3-footer/footer.component";
import { NavComponent } from "./features/1-nav/nav.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";



@NgModule( {
  declarations: [
    FooterComponent,
    NavComponent

  ],
  exports: [

  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
  ]
})
export class DashboardModule { }
