import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin } from "../model/responseLogin";
import { catchError, delay, map } from "rxjs/operators";
import { Observable, ObservableInput, of } from "rxjs";
import { ERROR_CONSTANTS } from 'src/app/core/errors/errors.const';
import { AuthService } from "../../auth/auth.service";
import { ENDPOINTS_API } from "../../routes/api.routes";
import { UserAuthenticated } from "../model/userAuthenticated";
import { HttpWrapperService } from "../../http/http-wrapper.service";
import { HttpClientOptions } from "../../http/http.service";


@Injectable( {
  providedIn: 'root'
} )
export class LoginService {

  constructor(
    private httpWrapperService: HttpWrapperService,
    private authService: AuthService,
  ) {}


  login( emailIn: string, passwordIn: string ): Observable<ResponseLogin> {
    const response: ResponseLogin = { error: true, message: ERROR_CONSTANTS.API.ERROR };
    //@ts-ignore
    const data = {
      mail: emailIn,
      password: passwordIn,
    }
    let httpClientOptions: HttpClientOptions = {
      body: data,
      config: {
        dialog: {
          title: 'Error al inicia sesión',
          body: 'Usuario o password incorrecto.',
          button1: 'Aceptar'
        }
      }
    }
    return this.httpWrapperService.post( ENDPOINTS_API.LOGIN, httpClientOptions ).pipe(
      delay( 500 ),
      map( ( res: any ) => {
        response.error = res.status != 200;
        response.message = res.statusText; // todo cambiar por message una vez que cambie el back.
        //@ts-ignore
        const { user, token } = this.getUserAndToken( res );
        this.authService.setUser( user, token );
        return response;
      } )
    );
  }

  private getUserAndToken( res: any ): Object {
    const user: UserAuthenticated = {
      mail: res.body.name,
      name: res.body.name,
      surname: res.body.name,
      phone: res.body.name,
      rol: res.body.rol,
    };
    const token = 'Bearer asdfjhasdfjahdahdiauhdaidbadjbnakdjakdjhadlkjahdfakljdhfakjdhalkdfjhaldkfjahsdfkjahdfakjh';
    return { user, token };
  }

}
