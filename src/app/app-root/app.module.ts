import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from '../dashboard/features/2-router-outlet/2-home/home.component';
import { BlockUIModule } from "ng-block-ui";
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from "../dashboard/features/3-footer/footer.component";
import { NavComponent } from '../dashboard/features/1-nav/nav.component';
import { CarouselComponent } from '../dashboard/features/2-carousel/caurosel.component';
import { CardsComponent } from '../dashboard/features/3-cards/cards.component';

@NgModule( {
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    CarouselComponent,
    CardsComponent
  ],
  imports: [
    AppRoutingModule,
    BlockUIModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
