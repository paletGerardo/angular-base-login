import {Injectable} from '@angular/core';
import {HttpWrapperService} from "../core/http/http-wrapper.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {LoadingService} from "../core/loading/loading.service";
import {PartnerTheme, TemaSocio} from "./shared/models/partnerTheme.model";
import {ENDPOINTS_API} from "../core/routes/api.routes";
import {Producto} from "./shared/models/productsResponse.model";
import {tap} from "rxjs/operators";
import {GlobalResponse} from "../core/http/http.response.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public partnerTheme$: BehaviorSubject<TemaSocio | undefined> = new BehaviorSubject<TemaSocio | undefined>(undefined);
  public temaSocio: TemaSocio | undefined = undefined;
  public toggleCarousel$ = new BehaviorSubject<boolean>(true);
  public onUrlChanged$: BehaviorSubject<any>;
  public navBarOnChanged!: BehaviorSubject<any>;
  public linkNavbarChanged!: BehaviorSubject<any>;
  public resumeDescuento!: BehaviorSubject<any>;
  public primaryColor: string | undefined = '';
  public secondaryColor: string | undefined = '';
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
    this.navBarOnChanged = new BehaviorSubject('');
    this.linkNavbarChanged = new BehaviorSubject('');

  }

  getCuit(): string | undefined {
    this.cuitSocio = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cuit_socio='))
      ?.split('=')[1];
    return this.cuitSocio;
  }

  getThemes(): void {
    if (!this.temaSocio) {
      const URL = `${ENDPOINTS_API.TEMA_SOCIO}/${this.cuitSocio}`;
      this.httpWrapperService.get<GlobalResponse>(URL).subscribe((res: GlobalResponse) => {
        if (res) {
          this.temaSocio = res.body;
          this.primaryColor = this.temaSocio?.color.primario;
          this.secondaryColor = this.temaSocio?.color.secundario;
          this.partnerTheme$.next(this.temaSocio);
        }
      });
    }
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

  getProductItemByIdProducto(id: number): Observable<GlobalResponse> {
    const URL = `${ENDPOINTS_API.PRODUCTO}/${id}/cuit-socio/${this.cuitSocio}`;
    return this.httpWrapperService.get<GlobalResponse>(URL).pipe(tap((response: GlobalResponse) => {
      this.products = response.body;
    }
    ));
  }

  getProductDetailByIdProductoAndCuit(id: number): Observable<GlobalResponse> {
    const URL = `${ENDPOINTS_API.DETALLE_PRODUCTO}/${id}/cuit-socio/${this.cuitSocio}`;
    return this.httpWrapperService.get<GlobalResponse>(URL).pipe(tap((response: GlobalResponse) => {
      this.products = response.body;
    }
    ));
  }

  getCoberturas(id: number): Observable<any> {

    const URL = ENDPOINTS_API.COBERTURAS + this.cuitSocio + "/" + id;
    return this.httpWrapperService.get<any[]>(URL, {responseType: "blob" as "json"}).pipe();
  }


  toggleCarousel(show: boolean) {
    this.toggleCarousel$.next(show);
  }

}

