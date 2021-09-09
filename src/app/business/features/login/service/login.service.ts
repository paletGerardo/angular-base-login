import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  userToken: string | null | undefined;
  hoy: Date | undefined;



  constructor(private http: HttpClient,
              ) {
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

  private guardarToken (idToken: string){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    this.hoy = new Date();
    this.hoy.setSeconds(3600);

    localStorage.setItem('expirta', this.hoy.getTime().toString());



  }

  leerToken(){
    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');

    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {

    // @ts-ignore
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
