import { Component, OnInit } from '@angular/core';
import { LoadingService } from "../loading.service";

@Component({
  selector: 'app-loading-templete',
  templateUrl: './loading-templete.component.html',
  styleUrls: ['./loading-templete.component.scss']
})
export class LoadingTempleteComponent implements OnInit {
  public fadeOutActive: boolean = false;

  constructor(private loadingServide: LoadingService) { }

  ngOnInit(): void {
    this.loadingServide.loadedData$.subscribe( value => {
      setTimeout(()=> {
        this.fadeOutActive = value;
      }, 3000)
    })
  }

}
