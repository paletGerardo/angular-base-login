import { Component, OnInit } from '@angular/core';
import{ CardsService } from './cards.service'
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  httpService: any;
  tematica: any;
  clrPrimary:any;
  clrSecondary:any;
  text:any;
  constructor(
    private cardService:CardsService
  ) { }

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
