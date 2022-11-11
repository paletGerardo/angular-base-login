import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { PartnerTheme } from '../../models/partnerTheme.model';


@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() text:string="sumar al carrrito"; 
  public partnerTheme: PartnerTheme | null | undefined;
  constructor(
    private loadingService: LoadingService,
    private dashBoardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: PartnerTheme | null ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.loadingService.tryToStopLoading();
      }
    } )
  }

}
