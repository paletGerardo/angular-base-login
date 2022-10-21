import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./features/3-router-outlet/1-home/home.component";
import { AboutComponent } from "./features/3-router-outlet/2-about/about.component";
import { ConsultPolicyComponent } from "./features/3-router-outlet/3-consult-policy/consult-policy.component";
import { DownloadPolicyComponent } from "./features/3-router-outlet/4-download-policy/download-policy.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'dashboard/about',
        component: AboutComponent,
      },
      {
        path: 'consult-policy',
        component: ConsultPolicyComponent,
      },
      {
        path: 'download-policy',
        component: DownloadPolicyComponent,
      }
    ]
  },
  {
    path: 'about',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      }
    ]
  },
  {
    path: 'policy/consult',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      }
    ]
  },
  {
    path: 'policy/download',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
