import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../dashboard/main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { CompanyComponent } from './company/company.component';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductComponent } from './product/product.component';
import { TaxComponent } from './tax/tax.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';

import { AuthGuard } from '../app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'inventory/product', pathMatch: 'full' },
          { path: 'main', component: DashboardComponent },
          { path: 'customers', component: CustomersComponent },
          { path: 'orders', component: OrdersComponent },
          {
            path: 'inventory',
            component: InventoryComponent,
            children: [
              { path: '', redirectTo: 'product', pathMatch: 'full' },
              { path: 'product', component: ProductComponent },
              { path: 'tax', component: TaxComponent },
              { path: 'promotion', component: PromotionComponent },
              { path: 'category', component: CategoryComponent }
            ]
          },
          { path: 'preferences', 
            component: PreferencesComponent,
            children: [
              { path: '', component: CompanyComponent }
            ] 
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
