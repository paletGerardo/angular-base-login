import {Injectable} from '@angular/core';
import {HttpWrapperService} from "../core/http/http-wrapper.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {LoadingService} from "../core/loading/loading.service";
import {TemaSocio} from "./shared/models/partnerTheme.model";
import {ENDPOINTS_API} from "../core/routes/api.routes";
import {Producto} from "./shared/models/productsResponse.model";
import {tap} from "rxjs/operators";
import {GlobalResponse} from "../core/http/http.response.model";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface Cobertura {
  id: number;
  id_producto: string;
  cuit_socio: string;
  descripcion?: string;
  url_icono?: string;
  prioridad: number;
}

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
  public isCompra!: BehaviorSubject<any>;
  public resumeDescuento!: BehaviorSubject<any>;
  public primaryColor: string | undefined = '';
  public secondaryColor: string | undefined = '';
  private products: Producto[] | undefined;
  private coberturas: Cobertura[] | undefined;
  public cuitSocio: string | undefined = '';

  public formAlta: FormGroup = this.buildForm();

  constructor(
    private httpWrapperService: HttpWrapperService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder
  ) {
    this.loadingService.tryToStartLoading();
    this.getCuit();
    this.getThemes();
    this.onUrlChanged$ = new BehaviorSubject([]);
    this.navBarOnChanged = new BehaviorSubject('');
    this.linkNavbarChanged = new BehaviorSubject('');
    this.isCompra = new BehaviorSubject('');

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
      const URL = `${ENDPOINTS_API.TEMA_SOCIO}/${this.cuitSocio}/tema-socio`;
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
    const URL = ENDPOINTS_API.PRODUCTS + '/'+ this.cuitSocio + '/productos';
    return this.httpWrapperService.get<Producto[]>(URL).pipe(tap((products: Producto[]) => {
        this.products = products;
      }
    ));
  }

  getProductItemByIdProducto(id: string): Observable<GlobalResponse> {
    const URL = `${ENDPOINTS_API.PRODUCTO}/${id}/cuit-socio/${this.cuitSocio}/detalle-${id}`;
    return this.httpWrapperService.get<GlobalResponse>(URL).pipe(tap((response: GlobalResponse) => {
        this.products = response.body;
      }
    ));
  }

  getCoberturasByCuitSocioAndIdProducto(idProducto: string): Observable<GlobalResponse> {
    const URL = `${ENDPOINTS_API.COBERTURAS}/obtener-coberturas/cuit-socio/${this.cuitSocio}/id-producto/${idProducto}`;
    return this.httpWrapperService.get<GlobalResponse>(URL).pipe(tap((response: GlobalResponse) => {
        this.coberturas = response.body;
      }
    ));
  }

  getProductDetailByIdProductoAndCuit(id: string): Observable<GlobalResponse> {
    const URL = `${ENDPOINTS_API.DETALLE_PRODUCTO}/${id}/cuit-socio/${this.cuitSocio}`;
    return this.httpWrapperService.get<GlobalResponse>(URL).pipe(tap((response: GlobalResponse) => {
        this.products = response.body;
      }
    ));
  }

  getCoberturas(idProducto: string): Observable<any> {
    const URL = ENDPOINTS_API.DESCARGAR_COBERTURA + this.cuitSocio + "/" + idProducto;
    return this.httpWrapperService.get<any[]>(URL, {responseType: "blob" as "json"}).pipe();
  }


  toggleCarousel(show: boolean) {
    this.toggleCarousel$.next(show);
  }


  buildForm() {
    return this.formBuilder.group(
      {

        personalData: {
          name: ['', [Validators.required, Validators.minLength(4)]],
          lastname: ['', Validators.required],
          nationality: ['', Validators.required],
          document_type: ['', Validators.required],
          document_number: ['', Validators.required],
          id_genre: ['', Validators.required],
          birthdate: ['', Validators.required],
          address: ['', Validators.required],
          number: ['', Validators.required],
          city: ['', Validators.required],
          province: ['', Validators.required],
          zip: ['', Validators.required],
          email: ['', Validators.required],
          //phone:[
          //{
          //phone_type:['',Validators.required],
          cod_area: ['', Validators.required],
          number_phone: ['', Validators.required]
          //}
          //]        },
        },
        beneficiary: {
          percentage: ['', [Validators.required]],

          name: ['', [Validators.required, Validators.minLength(4)]],
          lastname: ['', Validators.required],
          nationality: ['', Validators.required],
          document_type: ['', Validators.required],
          document_number: ['', Validators.required],
          id_genre: ['', Validators.required],
          birthdate: ['', Validators.required],
          address: ['', Validators.required],
          number: ['', Validators.required],
          city: ['', Validators.required],
          province: ['', Validators.required],
          zip: ['', Validators.required],
          email: ['', Validators.required],
          //phone:[
          //{
          //phone_type:['',Validators.required],
          cod_area: ['', Validators.required],
          number_phone: ['', Validators.required]
        },
        otherAddress: {

          address: ['', Validators.required],
          number: ['', Validators.required],
          city: ['', Validators.required],
          province: ['', Validators.required],
          zip: ['', Validators.required],
          email: ['', Validators.required],
          //phone:[
          //{
          //phone_type:['',Validators.required],
          cod_area: ['', Validators.required],
          number_phone: ['', Validators.required]
          //}
          //]
        },


        saleDetail: {
          is_insured_address: ['', Validators.required],
          additionals: [],
          beneficiaries: [],
          name_socio: ['', Validators.required],
          id_product: ['', Validators.required],
          code_product: ['', Validators.required],
          description_product: ['', Validators.required],
          id_ramo: ['', Validators.required],
          plan: ['', Validators.required],
          price: ['', Validators.required],
        },
        pay: {
          number_card: ['', Validators.required],
          expiration: ['', Validators.required],
          security_code: ['', Validators.required],
          cardholder: ['', Validators.required],
          //  payment_method:['',Validators.required],
          // payment_method_description:['',Validators.required]
        }

      }
    )
  }


  public getFormDataJson() {
    const formAlta = this.formAlta.getRawValue();
  }

}

