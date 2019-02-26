import { Component, OnInit } from '@angular/core';

import { Order } from '../models/order';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
  providers: [ OrdersService ]
})
export class OrdersComponent implements OnInit {

  constructor( public ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.ordersService.getOrder()
      .subscribe(res => {
        this.ordersService.orders = res as Order[];
      });
  }

  
}
