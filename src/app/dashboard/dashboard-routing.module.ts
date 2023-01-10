import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { ProductsComponent } from "./features/3-router-outlet/1-products/products.component";
import { HelpComponent } from './features/3-router-outlet/help/help.component';
import { NotFoundComponent } from "./features/3-router-outlet/not-found/not-found.component";
import { AboutComponent } from "./features/3-router-outlet/6-about/about.component";
import { ProductDetailComponent } from './features/3-router-outlet/2-product-detail/product-detail.component';
import {HowToBuyComponent} from "./features/3-router-outlet/how-to-buy/how-to-buy.component";
import { DataUserComponent } from './features/3-router-outlet/4-data-user-form/data-user.component';
import {UnsubscribeComponent} from "./features/3-router-outlet/unsubscribe/unsubscribe.component";

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
  /*{
    path: 'product-purchase/:id',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ProductPurchaseComponent,

      },
    ]
  },*/
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
  {
    path: 'unsubscribe',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: UnsubscribeComponent,

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
