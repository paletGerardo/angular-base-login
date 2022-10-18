import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from '../util/utils';
import { HttpClientOptions, HttpService } from './http.service';

interface Formdata {
  nombre: string;
  apellido: string;
  numero_de_documento: number;
  email: string;
  telefono: number;
  area: number;
  poliza: number;
}

@Injectable()
export class HttpWrapperService {
  public formdata: Formdata = {
    nombre: '',
    apellido: '',
    numero_de_documento: 0,
    email: '',
    telefono: 0,
    area: 0,
    poliza: 0,
  };

  public forma: any;

  save() {
    console.warn(this.forma.value);
  }
  //conectar formulario de registro con el servicio
  public postRegret<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {},
      body: data,
    };

    return this.http.post(resource, this.setOptions(info));
  }

  constructor(private http: HttpService) {
    console.log(this.formdata);
  }

  public get<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.http.get(resource, this.setOptions(options));
  }

  public post<T>(resource: string, _data?: any): Observable<T> {
    const info = {
      headers: {
        responseType: 'json',
        observe: 'response',
      },
      body: _data || '',
    };
    return this.http.post(resource, info);
  }

  public put<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.http.put(resource, this.setOptions(options));
  }

  public delete<T>(
    resource: string,
    options?: HttpClientOptions
  ): Observable<T> {
    /*    const auth = this.userProvider.isAuth();
    if (!auth) {
      return null;
    }*/
    return this.http.delete(resource, this.setOptions(options));
  }

  public patch<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'content-Type': 'application/json; charset=utf-8',
      },
      body: data,
    };
    return this.http.patch(resource, this.setOptions(info));
  }

  public newPut<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'content-Type': 'application/json; charset=utf-8',
      },
      body: data,
    };
    return this.http.put(resource, this.setOptions(info));
  }

  private setOptions(options?: HttpClientOptions): HttpClientOptions {
    return Utils.mergeDeep(options || {}, {
      headers: {
        Authorization: 'Bearer ',
      },
    });
  }
}
