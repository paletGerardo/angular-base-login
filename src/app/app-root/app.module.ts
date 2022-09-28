import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { BlockUIModule } from "ng-block-ui";
import { DashboardModule } from "../dashboard/dashboard.module";
import { CardsService } from '../dashboard/features/2-router-outlet/1-home/feature/2-cards/cards.service';

@NgModule( {
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BlockUIModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    DashboardModule,
  ],
  providers: [
    CardsService
  ],
  exports: [
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
