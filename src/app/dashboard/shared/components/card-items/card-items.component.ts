import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-items',
  templateUrl: './card-items.component.html',
  styleUrls: ['./card-items.component.scss']
})
export class CardItemsComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() icon: string = '';
  @Input() body: string = '';
  @Input() textColor: string = 'white';
  @Input() bgColor: string = 'green';
  @Input() MODEL: string = 'MODEL-1';

  constructor() { }

  ngOnInit(): void {
  }

}
