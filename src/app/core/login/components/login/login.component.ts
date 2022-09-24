import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../animations/route.animations";
import { ResponseLogin } from "../../model/responseLogin";
import { INTERNAL_ROUTES } from "../../../routes/internal.routes";
import { LoginService } from "../../services/login.service";
import { catchError } from "rxjs/operators";
import { LoadingService } from "../../../loading/loading.service";
import { LoginFormValues } from "../../model/loginFormValues";
import { Observable } from "rxjs";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private loginService: LoginService,
    private loadingService: LoadingService,
    private router: Router ) {}

  ngOnInit(): void {}

  onCreateAccountClick(): void {
    this.router.navigate( [ '/create-account' ] );
  }

  public loginAndRedirect( data: LoginFormValues ): void {
    this.loadingService.toggleLoading();
    this.loginService.login( data.email, data.password, true ).pipe(
      catchError((err: any, caught: Observable<any>): any => {
        console.log(err)
      })
    ).subscribe( ( loginResponse: ResponseLogin ) => {
        if ( !loginResponse.error ) this.router.navigateByUrl( INTERNAL_ROUTES.HOME );
      }
    );
  }
}
