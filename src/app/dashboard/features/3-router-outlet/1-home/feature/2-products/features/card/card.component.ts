import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../../../../../../dashboard.service";
@Component({
  selector: 'app-cards',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {
  }
}
