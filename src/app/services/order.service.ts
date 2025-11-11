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
      patient_id: 1,
      optometrist_id: 1,
      date: '2025-09-12',
      total: 250000,
      status: 'ACTIVE'
    },
    {
      id: 2,
      patient_id: 2,
      optometrist_id: 1,
      date: '2025-09-12',
      total: 400000,
      status: 'INACTIVE'
    }
  ]);
  orders$ = this.ordersService.asObservable();

  getOrders() {
    return this.ordersService.value;
  }

  getOrderById(id: number): OrderI | undefined {
  return this.ordersService.value.find(order => order.id === id);
}


  addOrder(order: OrderI) {
    const orders = this.ordersService.value;
    order.id = orders.length ? Math.max(...orders.map(serv => serv.id ?? 0)) + 1 : 1;
    this.ordersService.next([...orders, order]);
  }
}