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
import { ContactComponent } from './features/4-footer/features/contact/contact.component';
import { ButtonPrimaryComponent } from './shared/components/buttonPrimary/button-primary.component';
import { ButtonSecondaryComponent } from './shared/components/buttonSecondary/button-secondary.component';
import { NotFoundComponent } from "./features/3-router-outlet/not-found/not-found.component";
import { HelpComponent } from "./features/3-router-outlet/help/help.component";
import { AboutComponent } from "./features/3-router-outlet/6-about/about.component";
import { ProductDetailComponent } from './features/3-router-outlet/2-product-detail/product-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonDiretive } from "./shared/directive/btnHoverDirective";
import { PlanListComponent } from './features/3-router-outlet/2-product-detail/feature/plan-list/plan-list.component';
import { RiskListComponent } from './features/3-router-outlet/2-product-detail/feature/risk-list/risk-list.component';
import { TitleComponent } from "./shared/components/title/title.component";
import { DetailComponent } from './features/3-router-outlet/2-product-detail/feature/detail/detail.component';
import { SwiperModule } from "swiper/angular";
import { CarouselProductComponent } from './features/2-b-carousel-product/carousel-product.component';
import { PopUpRiskComponent } from './shared/components/popUpRisks/popUp-risk.component';
import { ButtonSeeMoreComponent } from './shared/components/buttonSeeMore/button-seeMore.component';
import { ProductPurchaseComponent } from './features/3-router-outlet/3-product-purchase/product-purchase.component';
import { FormEmailComponent } from './features/3-router-outlet/3-product-purchase/feature/form-email/form-email.component';
import { CuponComponent } from './features/3-router-outlet/3-product-purchase/feature/cupon/cupon.component';
import { StepperComponent } from './features/3-router-outlet/3-product-purchase/feature/stepper/stepper.component';
import { PaymentSummaryComponent } from './features/3-router-outlet/3-product-purchase/feature/payment-summary/payment-summary.component';
import { HowToBuyComponent } from './features/3-router-outlet/how-to-buy/how-to-buy.component';
import {SharedModule} from "./shared/shared.module";
import { DataUserComponent } from './features/3-router-outlet/4-data-user-form/data-user.component';
import { PersonalDataFormComponent } from './features/3-router-outlet/4-data-user-form/feature/1-datos-asegurado/personal-data-form.component';
import { StepperTwoComponent } from './features/3-router-outlet/4-data-user-form/feature/stepper/stepperTwo.component';
import { QuestionComponent } from './features/3-router-outlet/4-data-user-form/feature/question/question.component';
import { UnsubscribeComponent } from './features/3-router-outlet/unsubscribe/unsubscribe.component';
import { BuyFormComponent } from './features/3-router-outlet/5-buy-form/buy-form.component';
import { PayFormDataComponent } from './features/3-router-outlet/5-buy-form/feature/pay-form-data/pay-form-data.component';
import { CardsSvgComponent } from './features/3-router-outlet/5-buy-form/feature/cards-svg/cards-svg.component';
import { TextMaskModule } from 'angular2-text-mask';
import { SuccessOrErrorPayComponent } from './features/3-router-outlet/5-buy-form/feature/confirmation-or-reject/success-or-error-pay.component';


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
    ContactComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSeeMoreComponent,
    TitleComponent,
    NotFoundComponent,
    HelpComponent,
    ButtonDiretive,
    PlanListComponent,
    RiskListComponent,
    DetailComponent,
    PopUpRiskComponent,
    ProductPurchaseComponent,
    FormEmailComponent,
    CuponComponent,
    StepperComponent,
    PaymentSummaryComponent,
    HowToBuyComponent,
    DataUserComponent,
    PersonalDataFormComponent,
    StepperTwoComponent,
    QuestionComponent,
    UnsubscribeComponent,
    BuyFormComponent,
    PayFormDataComponent,
    CardsSvgComponent,
    SuccessOrErrorPayComponent



  ],
  exports: [
    DashboardComponent,
    NavComponent,
    FooterComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSeeMoreComponent,
    TitleComponent,
    CarouselProductComponent,
    PopUpRiskComponent,
    ProductPurchaseComponent,
    FormEmailComponent,
    CuponComponent,
    StepperComponent,
    PaymentSummaryComponent,
    DataUserComponent,
    PersonalDataFormComponent,
    StepperTwoComponent,
    QuestionComponent,
    BuyFormComponent,
    PayFormDataComponent,
    CardsSvgComponent,
    SuccessOrErrorPayComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SwiperModule,
        SharedModule,
        TextMaskModule



    ]
})
export class DashboardModule { }
