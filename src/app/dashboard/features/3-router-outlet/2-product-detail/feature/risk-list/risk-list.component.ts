import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-risk-list',
  templateUrl: './risk-list.component.html',
  styleUrls: [ './risk-list.component.scss' ]
} )
export class RiskListComponent implements OnInit {
  @Input() risks: any[] = [];
  selectedIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }
  selectImage(index: number): void {
    this. selectedIndex = index;
  }
}
