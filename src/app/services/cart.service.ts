import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[];

  readonly URL_API = 'http://localhost:4000/api/cart';

  constructor(private http: HttpClient) { }

  addItem(external: string){
    return this.http.post(this.URL_API + `/add/${external}`, null, { withCredentials: true });
  }

  plusItem(external: string){
    return this.http.post(this.URL_API + `/plus/${external}`, null, { withCredentials: true });
  }

  minusItem(external: string){
    return this.http.post(this.URL_API + `/minus/${external}`, null, { withCredentials: true });
  }

  getCart(){
    return this.http.get(this.URL_API + `/all`, { withCredentials: true });
  }

  processPurchase(data: any){
    return this.http.post(this.URL_API + `/process`, data, { withCredentials: true });
  }
}
