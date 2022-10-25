import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private loadingService: LoadingService

  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
  }

}
