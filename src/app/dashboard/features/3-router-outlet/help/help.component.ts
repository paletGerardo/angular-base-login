import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(
    private loadingService: LoadingService

  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
  }

}
