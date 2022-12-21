import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoadingService } from "src/app/core/loading/loading.service";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import {PartnerTheme, TemaSocio} from "../../models/partnerTheme.model";

@Component({
    selector: 'app-popUp-risk',
    templateUrl: './popUp-risk.component.html',
    styleUrls: ['./popUp-risk.component.scss']
  })

  export class PopUpRiskComponent implements OnInit {
 risks:any=[];
 public partnerTheme: TemaSocio | undefined;

 @ViewChild('closebutton') closebutton:any;

    constructor(
      @Inject(MAT_DIALOG_DATA) private _data: any,
      public matDialogRef: MatDialogRef<PopUpRiskComponent>,
      private dashBoardService:DashboardService,
      private loadingService:LoadingService
      ) {
     }

    ngOnInit(): void {
      console.log(this._data.risks);
      this.risks=this._data.risks;
      this.loadingService.tryToStopLoading();
      this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
        if ( parnetTheme ) {
          this.partnerTheme = parnetTheme;
          this.loadingService.tryToStopLoading();
        }
      } )
    }



    closemodal(){
      this.matDialogRef.close();
    }


  }
