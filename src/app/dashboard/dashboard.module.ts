import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./features/4-footer/footer.component";
import { NavComponent } from "./features/1-nav/nav.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MaterialModule } from "../core/material/material.module";
import { HomeComponent } from "./features/3-router-outlet/1-home/home.component";
import { DashboardComponent } from "./dashboard.component";
import { CarouselComponent } from './features/2-carousel/caurosel.component';
import { CardComponent } from './features/3-router-outlet/1-home/feature/2-products/features/card/card.component';
import { ProductsComponent } from './features/3-router-outlet/1-home/feature/2-products/products.component';
import { AboutComponent } from './features/3-router-outlet/2-about/about.component';
import { DownloadPolicyComponent } from './features/3-router-outlet/4-download-policy/download-policy.component';
import { ConsultPolicyComponent } from './features/3-router-outlet/3-consult-policy/consult-policy.component';
import { ContactComponent } from './features/4-footer/features/contact/contact.component';
import { ButtonPrimaryComponent } from './shared/components/buttonPrimary/button-primary.component';
import { ButtonSecondaryComponent } from './shared/components/buttonSecondary/button-secondary.component';

@NgModule( {
  declarations: [
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    NavComponent,
    CarouselComponent,
    CardComponent,
    ProductsComponent,
    AboutComponent,
    DownloadPolicyComponent,
    ConsultPolicyComponent,
    ProductsComponent,
    ContactComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent

  ],
  exports: [
    DashboardComponent,
    NavComponent,
    FooterComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
