import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { ProductsComponent } from "./features/3-router-outlet/1-products/products.component";
import { HelpComponent } from './features/3-router-outlet/help/help.component';
import { NotFoundComponent } from "./features/3-router-outlet/not-found/not-found.component";
import { PolicyConsultComponent } from "./features/3-router-outlet/7-policy-consult/policy-consult.component";
import { PolicyDownloadComponent } from "./features/3-router-outlet/8-policy-download/policy-download.component";
import { AboutComponent } from "./features/3-router-outlet/6-about/about.component";
import { ProductDetailComponent } from './features/3-router-outlet/2-product-detail/product-detail.component';
import { ProductPurchaseComponent } from './features/3-router-outlet/3-product-purchase/product-purchase.component';
import {HowToBuyComponent} from "./features/3-router-outlet/how-to-buy/how-to-buy.component";
import { DataUserComponent } from './features/3-router-outlet/4-data-user-form/data-user.component';
import { BuyFormComponent } from './features/3-router-outlet/5-buy-form/buy-form.component';

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
        component: ProductsComponent,

      },
    ]
  },
  {
    path: 'product-detail/:id',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ProductDetailComponent,

      },
    ]
  },
  {
    path: 'product-purchase/:id',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ProductPurchaseComponent,

      },
    ]
  },
  {
    path: 'data-user/:id',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DataUserComponent,

      },
    ]
  },
  {
    path: 'buy-form',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: BuyFormComponent,

      },
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
    path: 'how-to-buy',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HowToBuyComponent,
      }
    ]
  },
  {
    path: 'policy/consult',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: PolicyConsultComponent,
      }
    ]
  },
  {
    path: 'policy/download',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: PolicyDownloadComponent,
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
