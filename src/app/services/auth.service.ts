import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginAccount } from '../models/login-account';
import { catchError, map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface isLoggedIn {
  status: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  redirectURL: string;

  constructor(private http: HttpClient) { }

  login(Account: LoginAccount) {
    return this.http.post('http://localhost:4000/auth/session/login', Account, { withCredentials: true }).pipe(map(user => {
      /*if(user) return user;
      else return false;*/
      return user
    }));
  }

  isAuth() {
    return this.http.get('http://localhost:4000/auth/session', { withCredentials: true });
  }

  getUserInfo(){
    return this.http.get('http://localhost:4000/auth/session/user', { withCredentials: true });
  }

  logout(){
    return this.http.post('http://localhost:4000/auth/session/logout', null, { withCredentials: true });
  }

}
