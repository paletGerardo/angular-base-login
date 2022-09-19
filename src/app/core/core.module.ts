import { NgModule } from '@angular/core';
import { HttpWrapperService } from "./http/http-wrapper.service";
import { HttpService } from "./http/http.service";
import { RegexCommon } from "./regx/regex.service";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BlockUIModule } from 'ng-block-ui';

@NgModule( {
  imports: [

    // material
    MaterialModule,

    // angular
    CommonModule,
    RouterModule,
    HttpClientModule,

    // 3rd party
    BlockUIModule.forRoot()
  ],
  exports: [],
  declarations: [],
  providers: [
    HttpWrapperService,
    HttpService,
    RegexCommon
  ],
} )
export class CoreModule {
}
