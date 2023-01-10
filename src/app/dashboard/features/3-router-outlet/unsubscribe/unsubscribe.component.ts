import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../dashboard.service";

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {

  constructor( private dashboardService: DashboardService) {
    dashboardService.toggleCarousel$.next(false);
  }

  ngOnInit(): void {
  }

}
