import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import {PartnerTheme, TemaSocio} from '../../models/partnerTheme.model';


@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss']
})

export class ButtonSecondaryComponent implements OnInit,AfterViewInit {
  @Input() text?: any;
  @Input() activeColor?: any;
    @Input() cupon?:any;
    @Input() clicked?:any;
  partnerTheme: TemaSocio | undefined;
  seleccionado:boolean =false;
  color:any="";
  active:any="";
  constructor(
    private loadingService: LoadingService,
    public dashBoardService:DashboardService

  ) { }
  ngAfterViewInit(): void {
    this.dashBoardService.partnerTheme$.subscribe( ( parnetTheme: TemaSocio | undefined ) => {
      if ( parnetTheme ) {
        this.partnerTheme = parnetTheme;
        console.log("color",this.partnerTheme.color.secundario_rgba);
        this.active=this.partnerTheme.color.primario_rgba;
        this.color=this.partnerTheme.color.secundario_rgba;
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

    this.dashBoardService.cambiarColorChanged
    .subscribe(
    {
      next : res => {
        console.log(res);
        this.seleccionado = res;
      }
    }
    )
  }

}
