


import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import {PartnerTheme, TemaSocio} from '../../models/partnerTheme.model';


@Component({
  selector: 'app-button-seeMore',
  templateUrl: './button-seeMore.component.html',
  styleUrls: ['./button-seeMore.component.scss']
})
export class ButtonSeeMoreComponent implements OnInit {
    @Input() text:string="Ver más ";
    public partnerTheme: TemaSocio | undefined;
  constructor(
    private loadingService: LoadingService,
    private dashBoardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.loadingService.tryToStopLoading();
      }
    } )
  }

}




