import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginAccount } from '../models/login-account';

@Injectable({ providedIn: 'root' })
export class LoginService {
  Account: LoginAccount;
  
  constructor(private http: HttpClient) {
    this.Account = new LoginAccount();
  }

  login(Account: LoginAccount) {
    return this.http.post('http://localhost:4000/api/account/session/login', Account);
  }
}
