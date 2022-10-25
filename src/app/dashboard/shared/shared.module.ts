import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../core/material/material.module";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardModule } from '../dashboard.module';
import { HelpComponent } from './components/help/help.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardModule
  ]
})
export class SharedModule { }
