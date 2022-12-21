import { Component, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public showCarousel: boolean = true;

  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.toggleCarousel$.subscribe( (value: boolean) => {
      this.showCarousel = value;
    })
  }

}
