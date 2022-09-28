import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpWrapperService } from "src/app/core/http/http-wrapper.service";

@Injectable({
    providedIn:'root'
})
export class CardsService {
  
 
  constructor(
    private httpWrapper:HttpWrapperService
  ) { }


  getTematica() : Observable<any> {
    return this.httpWrapper.get<any>('http://localhost:8080/api/tematica');
    }
}