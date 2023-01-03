import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpRiskComponent } from 'src/app/dashboard/shared/components/popUpRisks/popUp-risk.component';
import {DashboardService} from "../../../../../dashboard.service";

@Component( {
  selector: 'app-risk-list',
  templateUrl: './risk-list.component.html',
  styleUrls: [ './risk-list.component.scss' ]
} )
export class RiskListComponent implements OnInit {
  @Input() risks: any[] = [];
  @Input() riskCopia: any[] = [];

  selectedIndex = 0;
  dialogRef: any;

  constructor(
    public dashboardService: DashboardService,
    private _matDialog: MatDialog,
    ) {
   }

  ngOnInit(): void {
  }
  selectImage(index: number): void {
    this. selectedIndex = index;
  }

  openPopUpRisks(): void {
    //if (this.activeFuncions) {
    this.dialogRef = this._matDialog.open(PopUpRiskComponent, {
        panelClass: 'app-popUp-risk',
        data: {
            risks: this.risks,
        }
    });
  }

}
