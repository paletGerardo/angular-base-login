import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plan } from "../../../../../shared/models/productsResponse.model";
import { PartnerTheme, TemaSocio } from "../../../../../shared/models/partnerTheme.model";
import { LoadingService } from "../../../../../../core/loading/loading.service";
import { DashboardService } from "../../../../../dashboard.service";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
  @Input() plans: Plan[] = [];
  @Output() emitPlanSelected: EventEmitter<string> = new EventEmitter<string>();
  cupon: boolean = false;
  plansObs: BehaviorSubject<any> = new BehaviorSubject<any>('');



  partnerTheme: TemaSocio | undefined;
  public primaryColor: string = '';
  public secundaryColor: string = '';
  selectedIndex: any;

  constructor( private loadingService: LoadingService,
               public dashBoardService: DashboardService,
                ) {

                 }

  ngOnInit(): void {

    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.primaryColor = parnetTheme.boton.primario_rgba;
        this.secundaryColor = parnetTheme.boton.secundario_rgba;
        this.plans.forEach((plan, index) => {
          console.log("los planes son",this.plans);
          if (index == 0) {
            plan.activeColor = this.partnerTheme?.color.primario_rgba;
            plan.active = true;
          } else {
            plan.activeColor = 'white';

          }
        })
        this.plansObs.next(this.plans)
        this.loadingService.tryToStopLoading();

      }
    } )
    this.emitSelected(this.plans[0],0);

  }


  public emitSelected( selectedPlan: any, i: any ): void {
    this.selectedIndex = i;
    this.plans.forEach((plan, index) => {
      if (index == 0) {
        plan.activeColor = this.partnerTheme?.color.primario_rgba;
        plan.active = true;
      } else {
        plan.activeColor = 'white';

      }
    })
    this.plansObs.next(this.plans)
    this.dashBoardService.cambiarColorChanged.next(true);
    console.log("plan", selectedPlan);
    this.plans.forEach(plan => {
      if (plan.codigo_plan === selectedPlan.codigo_plan) {
        plan.active = true;
      } else {
        plan.active = false;
      }
    })
    this.plansObs.next(this.plans)

    this.emitPlanSelected.emit(selectedPlan);
  }
  setIndex(i: any) {
    this.selectedIndex = i;
    this.dashBoardService.cambiarColorChanged.next(true);
  }

  selectButtonDefault() {
    document.addEventListener("DOMContentLoaded", function (event) {
      document.getElementById("opcion-0")!.classList.add('active');
    });
    console.log('asdasdsadasdsadasd'); 
  }

  prueba($event:any){
    console.log("la prueba resulto??", $event)
  }

}
