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
  @Input() text:string="Volver";
  @Input() title:string="";
  @Input() mostrarColorFondo:boolean=false;
  @Input() bgcolor:string | undefined = undefined;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  public partnerTheme: TemaSocio | null | undefined;
  public colorFondo: string | undefined = 'white';
  public color: string = '';
  constructor(
    private loadingService: LoadingService,
    public dashBoardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        this.colorFondo = this.dashBoardService.temaSocio?.boton.fondo_rgba;
        this.color = this.dashBoardService.temaSocio?.boton.primario_rgba;
        this.loadingService.tryToStopLoading();
      }
    } )
  }

  onClick() {
    this.clicked.emit(true);
  }

  validarColorFondo() {
    if(this.mostrarColorFondo){
      return this.colorFondo
    }
    return 'white';
  }
}
