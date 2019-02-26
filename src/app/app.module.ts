import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsModule } from 'angular-alert-module';
import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { RegisterPersonComponent  } from './components/register-person/register-person.component';
import { MainPageComponent } from './components/main-page/main-page.component';

import { DashboardModule } from '../dashboard/dashboard.module';

import { environment } from '../environments/environment';
import { PaymentComponent } from './components/payment/payment.component';
import { DoneComponent } from './components/done/done.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    RegisterPersonComponent,
    MainPageComponent,
    PaymentComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    NgbModule,
    AlertsModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_yZIILklZEAjhcQTznM2czD9E')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
