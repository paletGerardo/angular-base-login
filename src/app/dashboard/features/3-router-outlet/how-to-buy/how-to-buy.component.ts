import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../dashboard.service";

@Component({
  selector: 'app-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss']
})
export class HowToBuyComponent implements OnInit {

  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.toggleCarousel(false);
  }

}
