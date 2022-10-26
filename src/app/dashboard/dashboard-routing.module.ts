import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./features/3-router-outlet/1-home/home.component";
import { AboutComponent } from "./features/3-router-outlet/2-about/about.component";
import { HelpComponent } from './shared/components/help/help.component';
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
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
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: NotFoundComponent,
      }
    ]
  },
  {
    path: 'help',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HelpComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
