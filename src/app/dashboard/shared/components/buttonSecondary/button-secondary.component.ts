import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import {PartnerTheme, TemaSocio} from '../../models/partnerTheme.model';
import { PlanListComponent } from '../../../../dashboard/features/3-router-outlet/2-product-detail/feature/plan-list/plan-list.component';


@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss']
})

export class ButtonSecondaryComponent implements OnInit,AfterViewInit {
  @Input() text?: any;
  @Input()  active?:any;
  @Input() activeColor?: any;
    @Input() cupon?:any;
    @Input() clicked?:any;
    @Output() emitPlanSelected: EventEmitter<string> = new EventEmitter<string>();

  partnerTheme: TemaSocio | undefined;
  seleccionado:boolean =false;
  colorclickeado:any="";
  colorNotClicked: any;
  constructor(
    private loadingService: LoadingService,
    public dashBoardService:DashboardService,
    private planList: PlanListComponent

  ) { }
  ngAfterViewInit(): void {
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.colorclickeado=this.partnerTheme.color.secundario_rgba;
        this.colorNotClicked="grey";
        this.loadingService.tryToStopLoading();
      }
    } );

  }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.loadingService.tryToStopLoading();
      }
    } );

 
  }

}
