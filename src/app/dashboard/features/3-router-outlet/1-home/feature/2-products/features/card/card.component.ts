import { Component, OnInit } from '@angular/core';
import{ CardsService } from './cards.service'
@Component({
  selector: 'app-cards',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.obtenerTematica();
  }
  obtenerTematica() {
    this.cardService.getTematica().subscribe((data:any)=>{
      console.log(data);
      this.tematica=data;
      this.clrPrimary=this.tematica.colorPrimary;
      this.clrSecondary=this.tematica.colorSecondary;
      this.text=this.tematica.fontPrimary;
    })
  }

}
