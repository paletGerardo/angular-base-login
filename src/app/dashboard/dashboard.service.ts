import { Injectable } from '@angular/core';
import { HttpWrapperService } from "../core/http/http-wrapper.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { LoadingService } from "../core/loading/loading.service";
import { PartnerTheme } from "./shared/models/partnerTheme.model";
import { ENDPOINTS_API } from "../core/routes/api.routes";
import { Producto } from "./shared/models/productsResponse.model";
import { tap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public partnerTheme$: BehaviorSubject<PartnerTheme> = new BehaviorSubject<PartnerTheme>(new PartnerTheme());
  public toggleCarousel$ = new BehaviorSubject<boolean>(true);
  onUrlChanged$: BehaviorSubject<any>;
  navBarOnChanged!: BehaviorSubject<any>;
  linkNavbarChanged!:BehaviorSubject<any>;
  resumeDescuento!:BehaviorSubject<any>;
  private products: Producto[] | undefined;
  public cuitSocio: string | undefined = '';

  public formAlta:FormGroup= this.buildForm();
  constructor(
    private httpWrapperService: HttpWrapperService,
    private loadingService: LoadingService,
    private formBuilder:FormBuilder
  ) {
    this.loadingService.tryToStartLoading();
    this.getCuit();
    this.getThemes();
    this.onUrlChanged$ = new BehaviorSubject([]);
    this.navBarOnChanged = new BehaviorSubject('');
    this.linkNavbarChanged = new BehaviorSubject('');
    this.resumeDescuento = new BehaviorSubject('');



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


  buildForm(){
    return this.formBuilder.group(
      {
        personalData:{
          name:['',[Validators.required,Validators.minLength(4)]],
          lastname:['',Validators.required],
          nationality:['',Validators.required],
          document_type:['',Validators.required],
          document_number:['',Validators.required],
          id_genre:['',Validators.required],
          birthdate:['',Validators.required],
          address:['',Validators.required],
          number:['',Validators.required],
          city:['',Validators.required],
          province:['',Validators.required],
          zip:['',Validators.required],
          email:['',Validators.required],
          //phone:[
            //{
              //phone_type:['',Validators.required],
              cod_area:['',Validators.required],
              number_phone:['',Validators.required]
            //}
          //]
        },
        
       
        saleDetail:{
          is_insured_address:['',Validators.required],
          additionals:[],
          beneficiaries:[],
          name_socio:['',Validators.required],
          id_product:['',Validators.required],
          code_product:['',Validators.required],
          description_product:['',Validators.required],
          id_ramo:['',Validators.required],
          plan:['',Validators.required],
          price:['',Validators.required],
        },
        pay:{
          number_card:['',Validators.required],
          payment_method:['',Validators.required],
          payment_method_description:['',Validators.required]
         }
      
      }
      
    )}


    public getFormDataJson() {
      const formAlta = this.formAlta.getRawValue();
    }

}

