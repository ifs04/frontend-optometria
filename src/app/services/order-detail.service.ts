import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { OrderDetailI } from '../models/order-detail';


@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
private orderDetailService = new BehaviorSubject<OrderDetailI[]>([
    {
    id: 1,
    order_id: 1,
    product_type: 'LENS',
    product_id: 1,
    quantity: 2,
    unit_price: 150000,
    graduation: '2.00',
    subtotal: 300000,
    status: 'ACTIVE'
  },
  {
    id: 2,
    order_id: 1,
    product_type: 'FRAME',
    product_id: 1,
    quantity: 1,
    unit_price: 200000,
    subtotal: 250000,
    status: 'ACTIVE'
  }
  ]);
  orderDetails$ = this.orderDetailService.asObservable();

  getOrderDetails() {
    return this.orderDetailService.value;
  }

  getDetailsByOrderId(order_id: number): OrderDetailI[] {
    return this.orderDetailService.value.filter(detail => detail.order_id === order_id);
  }

  getDetailById(id: number): OrderDetailI | undefined {
    return this.orderDetailService.value.find(detail => detail.id === id);
  }


  addOrderDetail(orderDetail: OrderDetailI) {
    const orderDetails = this.orderDetailService.value;
    orderDetail.id = orderDetails.length ? Math.max(...orderDetails.map(ord => ord.id ?? 0)) + 1 : 1;
    this.orderDetailService.next([...orderDetails, orderDetail]);
  }
}