import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRootComponent } from './components/login-root.component';
import { LoginComponent } from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: LoginRootComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
        data: { title: 'Ingresar' }
      },
    ]
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: { title: 'Registro' }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
