import { Component, Input, OnInit } from '@angular/core';

import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

import { PartnerTheme } from '../../models/partnerTheme.model';

import { HostListener } from '@angular/core';
@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss'],
})
export class ButtonSecondaryComponent implements OnInit {
  public partnerTheme: PartnerTheme | any;
  public backGroundClass = false;
  public primaryColor: string = '';
  public secundaryColor: string = '';
  public showMenuButton: boolean | undefined;

  @Input() text?: any;

  constructor(
    private loadingService: LoadingService,
    private dashBoardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.showMenuButton = false;
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
