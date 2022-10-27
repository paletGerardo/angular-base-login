import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../core/material/material.module";
import { DashboardModule } from '../dashboard.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardModule
  ]
})
export class SharedModule { }
