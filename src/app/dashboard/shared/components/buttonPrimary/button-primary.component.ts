import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import {PartnerTheme, TemaSocio} from '../../models/partnerTheme.model';


@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() text:string="comprar";
  @Input() bgcolor:string | undefined = undefined;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  public partnerTheme: TemaSocio | null | undefined;
  constructor(
    private loadingService: LoadingService,
    private dashBoardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.loadingService.tryToStopLoading();
      }
    } )
  }

  onClick() {
    this.clicked.emit(true);
  }
}
