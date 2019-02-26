import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, map, tap, first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { LoginAccount } from '../../models/login-account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  account: LoginAccount
  constructor(
    private auth: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.account = new LoginAccount();
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.account).pipe(first())
      .subscribe(
        data => {
          console.log("DATA: " + data);
          this.router.navigate(['/dashboard']);
        }, error => {
          this.alertService.error("Usuario o contraseña incorrectos.");
          console.log("ERROR: " + error);
        }
      )
  }
}
