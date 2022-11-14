import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./features/4-footer/footer.component";
import { NavComponent } from "./features/1-nav/nav.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MaterialModule } from "../core/material/material.module";
import { ProductsComponent } from "./features/3-router-outlet/1-products/products.component";
import { DashboardComponent } from "./dashboard.component";
import { CarouselComponent } from './features/2-carousel/caurosel.component';
import { ProductCardComponent } from './features/3-router-outlet/1-products/feature/product-card/product-card.component';
import { PolicyDownloadComponent } from './features/3-router-outlet/5-policy-download/policy-download.component';
import { PolicyConsultComponent } from './features/3-router-outlet/4-policy-consult/policy-consult.component';
import { ContactComponent } from './features/4-footer/features/contact/contact.component';
import { ButtonPrimaryComponent } from './shared/components/buttonPrimary/button-primary.component';
import { ButtonSecondaryComponent } from './shared/components/buttonSecondary/button-secondary.component';
import { NotFoundComponent } from "./features/3-router-outlet/not-found/not-found.component";
import { HelpComponent } from "./features/3-router-outlet/help/help.component";
import { AboutComponent } from "./features/3-router-outlet/3-about/about.component";
import { ProductDetailComponent } from './features/3-router-outlet/2-product-detail/product-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonDiretive } from "./shared/directive/btnHoverDirective";
import { PlanListComponent } from './features/3-router-outlet/2-product-detail/feature/plan-list/plan-list.component';
import { RiskListComponent } from './features/3-router-outlet/2-product-detail/feature/risk-list/risk-list.component';
import { TitleComponent } from "./shared/components/title/title.component";
import { DetailComponent } from './features/3-router-outlet/2-product-detail/feature/detail/detail.component';
import { SwiperModule } from "swiper/angular";
import { CarouselProductComponent } from './features/2-b-carousel-product/carousel-product.component';

@NgModule( {
  declarations: [
    DashboardComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    NavComponent,
    CarouselComponent,
    CarouselProductComponent,
    ProductCardComponent,
    AboutComponent,
    PolicyDownloadComponent,
    PolicyConsultComponent,
    ContactComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    TitleComponent,
    NotFoundComponent,
    HelpComponent,
    ButtonDiretive,
    PlanListComponent,
    RiskListComponent,
    DetailComponent,

  ],
  exports: [
    DashboardComponent,
    NavComponent,
    FooterComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    TitleComponent,
    CarouselProductComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
  ]
})
export class DashboardModule { }
