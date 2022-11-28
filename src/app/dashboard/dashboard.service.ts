import { Injectable } from '@angular/core';
import { HttpWrapperService } from "../core/http/http-wrapper.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { LoadingService } from "../core/loading/loading.service";
import { PartnerTheme } from "./shared/models/partnerTheme.model";
import { ENDPOINTS_API } from "../core/routes/api.routes";
import { Producto } from "./shared/models/productsResponse.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public partnerTheme$: BehaviorSubject<PartnerTheme> = new BehaviorSubject<PartnerTheme>(new PartnerTheme());
  public toggleCarousel$ = new BehaviorSubject<boolean>(true);
  onUrlChanged$: BehaviorSubject<any>;

  private products: Producto[] | undefined;
  public cuitSocio: string | undefined = '';

  constructor(
    private httpWrapperService: HttpWrapperService,
    private loadingService: LoadingService
  ) {
    this.loadingService.tryToStartLoading();
    this.getCuit();
    this.getThemes();
    this.onUrlChanged$ = new BehaviorSubject([]);
  }

  getCuit(): string | undefined {
    this.cuitSocio = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cuit_socio='))
      ?.split('=')[1];
    return this.cuitSocio;
  }

  getThemes(): void {
    const URL = ENDPOINTS_API.THEMES + this.cuitSocio;
    this.httpWrapperService.get<PartnerTheme>(URL).subscribe((res: PartnerTheme) => {
      this.partnerTheme$.next(res);
    });
  }

  getProducts(): Observable<Producto[]> {
    //if ( this.products ) {
    //return of( this.products );
    //}
    const URL = ENDPOINTS_API.PRODUCTS + this.cuitSocio;
    return this.httpWrapperService.get<Producto[]>(URL).pipe(tap((products: Producto[]) => {
      this.products = products;
    }
    ));
  }

  getProductItemByIdProducto(id: number): Observable<Producto[]> {


    const URL = ENDPOINTS_API.PRODUCTSDETAIL + id + "/" + this.cuitSocio;
    return this.httpWrapperService.get<Producto[]>(URL).pipe(tap((products: Producto[]) => {
      this.products = products;
    }
    ));
  }

  getCoberturas(id: number): Observable<any> {

    const URL = ENDPOINTS_API.COBERTURAS + this.cuitSocio + "/" + id;
    return this.httpWrapperService.get<any[]>(URL, { responseType: "blob" as "json" }).pipe();
  }


  toggleCarousel(show: boolean) {
    this.toggleCarousel$.next(show);
  }

}

