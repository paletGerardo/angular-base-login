import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hoy: Date | undefined;

  constructor(private http: HttpClient,
            private requestServices: RequestService) {
    this.leerToken();
  }

  logOut(){
    localStorage.removeItem('token');

  }


 login(emailIn: string, passwordIn: string){
  let headers = new HttpHeaders().set('observe', 'response');
  const body = {
        mail: emailIn,
       password: passwordIn,
      }

  return this.http.post(`https://hours-backend-pruebas.herokuapp.com/login`, body, {observe: 'response' as 'body'})

 }


  private guardarToken (idToken: string | undefined){
    if ( typeof idToken === "string" ) {
      localStorage.setItem( 'token', idToken );
    }
    this.hoy = new Date();
    this.hoy.setSeconds(3600);
    localStorage.setItem('expirta', this.hoy.getTime().toString());
  }

  leerToken() : any{
    if (localStorage.getItem('token')){
      return localStorage.getItem('token');

    }else{
      '';
    }
  }

  estaAutenticado(): boolean {

    //@ts-ignore
    if (this.userToken.length<2){
      return false
    }

    const expira = Number(localStorage.getItem('expirta'));
    const expiraDate = new Date ();
    expiraDate.setTime(expira);

    if (expiraDate > new Date ()){
      return true
    }else {
      return false;
    }


  }

}
