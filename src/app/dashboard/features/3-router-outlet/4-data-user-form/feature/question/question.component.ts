import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { PartnerTheme } from '../../../../../shared/models/partnerTheme.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})


export class QuestionComponent implements OnInit {
  @Input() domicilio:any;
  @Input() beneficiario:any;
  @Input() question:any;
  @Output("respuesta") respuesta: EventEmitter<any> = new EventEmitter() ;

  constructor( private dashboardService:DashboardService,

) {
  }

  rta: boolean=true;
  ngOnInit(): void {
    console.log(this.domicilio);
    console.log(this.beneficiario);
   
  }

  otherAddress() {
    this.rta = false;
    this.respuesta.emit(this.rta);
  }

  irPlandePago(){
    this.rta=true;
    this.respuesta.emit(this.rta);

  }

}  