import { NgModule } from '@angular/core';
import { HttpWrapperService } from "./http/http-wrapper.service";
import { HttpService } from "./http/http.service";
import { RegexCommon } from "./regx/regex.service";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BlockUIModule } from 'ng-block-ui';
import { ErrorDialogComponent } from "./errors/error-dialog/error-dialog.component";
import { LoadingTempleteComponent } from "./loading/loading-templete/loading-templete.component";

@NgModule( {
  imports: [

    // material
    MaterialModule,

    // angular
    CommonModule,
    RouterModule,
    HttpClientModule,

    // 3rd party
    BlockUIModule.forRoot({
//      template: LoadingTempleteComponent
    })
  ],
  exports: [],
  declarations: [
    ErrorDialogComponent,
    LoadingTempleteComponent,
  ],
  providers: [
    HttpWrapperService,
    HttpService,
    RegexCommon,
  ],
  entryComponents: [
    LoadingTempleteComponent,
  ],
} )
export class CoreModule {}
