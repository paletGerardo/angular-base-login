import { Injectable } from '@angular/core';
import { HttpWrapperService } from "../core/http/http-wrapper.service";
import { BehaviorSubject } from "rxjs";
import { LoadingService } from "../core/loading/loading.service";
import { PartnerTheme } from "./shared/models/partnerTheme.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public partnerTheme$: BehaviorSubject<PartnerTheme | null> = new BehaviorSubject<PartnerTheme | null>(null);

  constructor(
    private httpWrapper:HttpWrapperService,
    private loadingService: LoadingService
  ) {
    this.loadingService.tryToStartLoading();
    this.getTematica();
  }

  getTematica() : void {
    this.httpWrapper.get<any>('http://localhost:8080/api/tematica').subscribe( (res: PartnerTheme) => {
      this.partnerTheme$.next(res);
    });
  }
}
