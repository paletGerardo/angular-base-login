import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ResponseLogin} from "../model/responseLogin";
import {ERROR_CONSTANTS} from "../../../../core/errors/errors.const";
import {ENDPOINTS_API} from "../../../../core/routes/api.routes";
import {catchError, map} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../../../../core/auth/auth.service";




@Injectable( {
  providedIn: 'root'
} )
export class RegisteredService {
  constructor (    private http: HttpClient,
                   private authService: AuthService,

  ){}

  login( emailIn: string, passwordIn: string, nameIn: string, ): Observable<ResponseLogin> {
    const response: ResponseLogin = { error: true, message: ERROR_CONSTANTS.API.ERROR };
    //@ts-ignore
    const { options, body } = this.getOptionAndBody( emailIn, passwordIn );
    return this.http.post( ENDPOINTS_API.AUTH.LOGIN, body, options )
      .pipe(
        map( ( res: any ) => {
          response.error = res.status != 200;
          response.message = res.statusText; // todo cambiar por message una vez que cambie el back.
          //@ts-ignore
          const { user, token } = this.getUserAndToken( res );
          this.authService.setUser( user, token );
          return response;
        } ),
        catchError( e => {
          return of( response );
        } )
      );
  }
}
