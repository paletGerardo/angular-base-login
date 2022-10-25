import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';


@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() text:string="sumar al carrrito"; 
  constructor(
    private loadingService: LoadingService

  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
  }

}
