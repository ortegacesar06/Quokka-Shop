import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterPersonComponent  } from './components/register-person/register-person.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DoneComponent } from './components/done/done.component';

import { from } from 'rxjs';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-person', component: RegisterPersonComponent },
  { path: 'payment', canActivate: [AuthGuard], component: PaymentComponent },
  { path: 'done', component: DoneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
