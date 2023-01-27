import { Component, OnInit } from '@angular/core';
import { TemaSocio } from 'src/app/dashboard/shared/models/partnerTheme.model';
import {DashboardService} from "../../../dashboard.service";

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {
  public primaryColor: string | undefined;
  public secundaryColor: string | undefined;

  constructor( private dashboardService: DashboardService) {
    dashboardService.toggleCarousel$.next(false);
  }

  ngOnInit(): void {
    this.dashboardService.partnerTheme$.subscribe(
      ( partnerThemes: TemaSocio | undefined ) => {
        if ( partnerThemes ) {
          this.primaryColor = partnerThemes.color.primario_rgba;
          this.secundaryColor = partnerThemes.color.secundario_rgba;
        }
      }
    );
  }

}
