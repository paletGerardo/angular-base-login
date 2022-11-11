import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { PartnerTheme } from '../../models/partnerTheme.model';


@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss']
})

export class ButtonSecondaryComponent implements OnInit {
    @Input() text?:any;
  partnerTheme: any;
  constructor(
    private loadingService: LoadingService,
    private dashBoardService:DashboardService

  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    console.log(this.text);
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: PartnerTheme | null ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        console.log('color->', this.partnerTheme.color_tertiary);
        this.loadingService.tryToStopLoading();
      }
    } )
  }

}