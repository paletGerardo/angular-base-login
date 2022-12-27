import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { PartnerTheme } from '../../models/partnerTheme.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})


export class QuestionComponent implements OnInit {
  @Input() domicilio:any;
  @Input() beneficiario:any;
  @Output() respuestaPositiva = new EventEmitter();
  rta: boolean=true;
  ngOnInit(): void {
    console.log(this.domicilio);
    console.log(this.beneficiario);
  }

  otherAddress() {
    this.rta = true;
    this.respuestaPositiva.emit(this.rta);
  }

}  