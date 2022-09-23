import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./features/3-footer/footer.component";
import { NavComponent } from "./features/1-nav/nav.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MaterialModule } from "../core/material/material.module";
import { HomeComponent } from "./features/2-router-outlet/1-home/home.component";
import { DashboardComponent } from "./dashboard.component";

@NgModule( {
  declarations: [
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    NavComponent

  ],
  exports: [
    DashboardComponent,
    NavComponent,
    FooterComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
