import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private dashboardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.linkNavbarChanged.next(false);

  }

}
