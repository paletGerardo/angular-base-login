import { Injectable } from '@angular/core';
import { HttpWrapperService } from "../core/http/http-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpWrapper:HttpWrapperService) {
  }

  getTematica() : void {
    this.httpWrapper.get<any>('http://localhost:8080/api/tematica').subscribe( res => {
      console.log(res);
    });
  }
}
