import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { AuthGuardService } from '@app/core/auth/auth-guard.service';
//import { LoggedInGuardService } from '@app/core/auth/logged-in-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./business/features/login/login.module').then((m) => m.LoginModule),
//    canActivate: [LoggedInGuardService]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./business/features/login/login.module').then((m) => m.LoginModule),
//    canActivate: [LoggedInGuardService]
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
