import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { CompanyComponent } from './company/company.component';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductComponent } from './product/product.component';
import { TaxComponent } from './tax/tax.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMenssageComponent } from './control-menssage/control-menssage.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [MainComponent, MenuComponent, DashboardComponent, PreferencesComponent, CompanyComponent, CategoryComponent, InventoryComponent, ProductComponent, TaxComponent, PromotionComponent, ControlMenssageComponent, CustomersComponent, OrdersComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
