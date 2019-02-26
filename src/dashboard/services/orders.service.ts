import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  selectedOrder: Order;
  orders: Order[];

  readonly URL_API = 'http://localhost:4000/api/cart';

  constructor( private http: HttpClient ) {
    this.selectedOrder = new Order();
  }

  getOrder(){
    return this.http.get(this.URL_API+`/order`);
  }
}
