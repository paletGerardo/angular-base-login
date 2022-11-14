import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { PartnerTheme } from '../../models/partnerTheme.model';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss'],
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() text: string = 'sumar al carrrito';
  public partnerTheme: PartnerTheme | null | undefined;
  public backGroundClass = false;
  public primaryColor: string = '';
  public secundaryColor: string = '';

  constructor(
    private loadingService: LoadingService,
    private dashBoardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadingService.tryToStartLoading();
    this.dashBoardService.partnerTheme$.subscribe(
      (partnerThemes: PartnerTheme | null) => {
        if (partnerThemes) {
          this.partnerTheme = partnerThemes;

          this.primaryColor = partnerThemes.color_primary;

          this.loadingService.tryToStopLoading();
        }
      }
    );
  }
}
