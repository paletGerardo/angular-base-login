import { Component, OnInit } from '@angular/core';
import {ResponseLogin} from "../../model/responseLogin";
import {INTERNAL_ROUTES} from "../../../../../core/routes/internal.routes";
import {RegisteredService} from "../../services/registered.service";
import {NotRegisteredDialogComponent} from "../not-registered-dialog/not-registered-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../../../core/animations/route.animations";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(    private RegisteredService: RegisteredService,
                  private dialog: MatDialog,
                  private router: Router,) { }

  ngOnInit(): void {
  }

  public registerAndRedirect( data: { email: string, password: string, name:string } ): void {
    this.RegisteredService.login( data.email, data.password, data.name )
      .subscribe( ( loginResponse: ResponseLogin ) => {
          loginResponse.error ? this.showDialog(loginResponse.message) : this.router.navigateByUrl( INTERNAL_ROUTES.HOME );
        }
      );
  }

  private showDialog( message: string | undefined ): void {
    this.dialog.open( NotRegisteredDialogComponent, {
      width: '350px',
      data: message,
      restoreFocus: false
    } );
  }


}


