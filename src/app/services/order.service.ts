import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { OrderI } from '../models/order';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersService = new BehaviorSubject<OrderI[]>([
     {
      id: 1,
      patientId: 1,
      optometristId: 1,
      date: '2025-09-12',
      total: 250000,
      status: 'PENDING'
    },
    {
      id: 2,
      patientId: 2,
      optometristId: 1,
      date: '2025-09-12',
      total: 400000,
      status: 'IN_PROCESS'
    }
  ]);
  orders$ = this.ordersService.asObservable();

  getOrders() {
    return this.ordersService.value;
  }

  addOrder(order: OrderI) {
    const orders = this.ordersService.value;
    order.id = orders.length ? Math.max(...orders.map(serv => serv.id ?? 0)) + 1 : 1;
    this.ordersService.next([...orders, order]);
  }
}