import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from '../dashboard/features/2-router-outlet/2-home/home.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('../dashboard/features/2-router-outlet/1-login-registration/login.module').then(( m) => m.LoginModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../dashboard/features/2-router-outlet/1-login-registration/login.module').then(( m) => m.LoginModule),
  },
  {
    path: '2-home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
