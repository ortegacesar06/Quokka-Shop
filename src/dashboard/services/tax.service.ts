import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tax } from '../models/tax';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  selectedTax: Tax;
  taxs: Tax[];

  readonly URL_API = 'http://localhost:4000/api/tax';

  constructor(private http: HttpClient) {
    this.selectedTax = new Tax();
   }

   postTax(tax: Tax) {
     return this.http.post(this.URL_API, tax);
   }

   getTax(){
     return this.http.get(this.URL_API);
   }

   putTax(tax: Tax){
     return this.http.put(this.URL_API+`/${tax.id_tax}`, tax);
   }
}
