import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() price: string = '';
  @Input() itemsArray: any[] = [];
  @Input() page: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
