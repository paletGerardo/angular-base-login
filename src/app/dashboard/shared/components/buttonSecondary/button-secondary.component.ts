import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';


@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss']
})

export class ButtonSecondaryComponent implements OnInit {
    @Input() text?:any;
  constructor(
    private loadingService: LoadingService

  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    console.log(this.text);
  }

}