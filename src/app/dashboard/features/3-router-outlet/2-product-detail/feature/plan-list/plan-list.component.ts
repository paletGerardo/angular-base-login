import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plan } from "../../../../../shared/models/productsResponse.model";
import { PartnerTheme } from "../../../../../shared/models/partnerTheme.model";
import { LoadingService } from "../../../../../../core/loading/loading.service";
import { DashboardService } from "../../../../../dashboard.service";

@Component( {
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: [ './plan-list.component.scss' ]
} )
export class PlanListComponent implements OnInit {
  @Input() plans: Plan[] = [];
  @Output() emitPlanSelected: EventEmitter<string> = new EventEmitter<string>();
  partnerTheme: PartnerTheme = new PartnerTheme();
  public primaryColor: string = '';
  public secundaryColor: string = '';

  constructor( private loadingService: LoadingService,
               public dashBoardService: DashboardService ) { }

  ngOnInit(): void {
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: PartnerTheme | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.primaryColor = parnetTheme.colors.rgba_primary;
        this.secundaryColor = parnetTheme.colors.rgba_secondary;
        this.plans.forEach( (plan, index) => {
          if(index == 0) {
            plan.activeColor = this.partnerTheme.colors.rgba_primary
          } else {
            plan.activeColor = 'white';
          }
        } )
        this.loadingService.tryToStopLoading();

      }
    } )
  }


  public emitSelected( selectedPlan: any ): void {
    this.plans.forEach( plan => {
      if ( plan.codigo_plan === selectedPlan.codigo_plan ) {
        plan.activeColor = this.primaryColor;
      } else {
        plan.activeColor = 'white';
      }
    } )
    this.emitPlanSelected.emit( selectedPlan );
  }
}
