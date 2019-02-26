import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterPerson } from '../models/register-person';
import { Account } from '../models/account';



@Injectable({
  providedIn: 'root'
})
export class RegisterPersonService {
  
  selectedRegisterPerson: RegisterPerson;
  selectedAccount: Account;
  persons: RegisterPerson[];
  accounts: Account[];

  readonly URL_API = 'http://localhost:4000/api/person';
  readonly URL_API_ACCOUNT = 'http://localhost:4000/api/account';

  constructor(private http: HttpClient) {
    this.selectedRegisterPerson = new RegisterPerson();
    this.selectedAccount = new Account();
  }

  postRegisterPerson(registerPerson: RegisterPerson){
    return this.http.post(this.URL_API, registerPerson);
  }

  personSearch(search: any){
    return this.http.post(this.URL_API+`/search`, search);
  }

  getRegisterPerson(){
    return this.http.get(this.URL_API);
  }

  putRegisterPerson(registerPerson: RegisterPerson){
    return this.http.put(this.URL_API+`/${registerPerson.id_person}`, registerPerson);
  }
  
  postAccount(account: Account){
    return this.http.post(this.URL_API_ACCOUNT, account);
  }

  getAccount(){
    return this.http.get(this.URL_API_ACCOUNT);
  }

  putAccount(account: Account){
    return this.http.put(this.URL_API_ACCOUNT+`/${account.id_account}`, account);
  }
}
