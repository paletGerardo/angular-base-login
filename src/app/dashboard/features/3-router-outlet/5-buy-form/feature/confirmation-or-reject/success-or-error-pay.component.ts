import { Component, Input, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';



@Component( {
  selector: 'app-success-or-error-pay',
  templateUrl: './success-or-error-pay.component.html'

} )


export class SuccessOrErrorPayComponent implements OnInit {
    private _unsubscribeAll: Subject<any>;
    isCompra: any=false;
    @Input() text:string='volver a formulario de pago';

    constructor(
        private dashBoardService: DashboardService,
        private router:Router,
        private loadingService: LoadingService,
      ) {
        this._unsubscribeAll = new Subject();
    
      }
    

    ngOnInit(): void {
        this.dashBoardService.isCompra
    .pipe()
        .subscribe({
         next: res => {
         this.isCompra=res;
       }
    });
    }

    volver(){
        let ruta = 'dashboard/buy-form/';
          console.log("ruta",ruta);
          this.router.navigate([ruta]);
    }

}