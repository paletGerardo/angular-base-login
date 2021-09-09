import { NgModule } from '@angular/core';
import { PreRequestService } from "./services/pre-request.service";
import { RequestService } from "./services/request.service";
import { RegexCommon } from "./services/regex.service";
import { MaterialModule } from "./material/material.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { BlockUIModule } from 'ng-block-ui';

@NgModule( {
  imports: [

    // material
    MaterialModule,
    // angular
    CommonModule,
    RouterModule,
    HttpClientModule,

    // material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,

    // 3rd party
    BlockUIModule.forRoot()
  ],
  exports: [],
  declarations: [],
  providers: [
    PreRequestService,
    RequestService,
    RegexCommon
  ],
} )
export class CoreModule {
}
