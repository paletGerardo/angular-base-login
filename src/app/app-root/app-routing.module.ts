import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
 /* {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },*/
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../core/login/login.module').then(( m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then(( m) => m.DashboardModule),
  },

  // Este elelemento siempre tiene que quedar al final.
  {
    path: '**',
    redirectTo: 'auth'
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
