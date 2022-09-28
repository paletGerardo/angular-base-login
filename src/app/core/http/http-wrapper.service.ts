import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from "../util/utils";
import { HttpClientOptions, HttpService } from "./http.service";

@Injectable()
export class HttpWrapperService {
  constructor(
    private httpService: HttpService,
  ) { }

  public get<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.httpService.get( resource, this.setOptions( options ) );
  }

  public post<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.httpService.post( resource, this.setOptions( options ) );
  }

  public put<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.httpService.put( resource, this.setOptions( options ) );
  }

  public delete<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    /*    const auth = this.userProvider.isAuth();
        if (!auth) {
          return null;
        }*/
    return this.httpService.delete( resource, this.setOptions( options ) );
  }

  public patch<T>( resource: string, data: any ): Observable<T> {
    const info = {
      headers: {
      },
      body: data
    };
    return this.httpService.patch( resource, this.setOptions( info ) );
  }

  public newPut<T>( resource: string, data: any ): Observable<T> {
    return this.httpService.put( resource, this.setOptions( data ) );
  }


  private setOptions( options?: HttpClientOptions ): HttpClientOptions {
    return Utils.mergeDeep( options || {}, {
      headers: {
        Authorization: 'Bearer ',
      }
    } );
  }
}
