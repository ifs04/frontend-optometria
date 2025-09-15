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
    orderId: 1,
    productType: 'LENS',
    productId: 1,
    quantity: 2,
    unitPrice: 150000,
    graduation: '2.00',
    subtotal: 300000
  },
  {
    id: 2,
    orderId: 1,
    productType: 'FRAME',
    productId: 1,
    quantity: 1,
    unitPrice: 200000,
    subtotal: 250000
  }
  ]);
  orderDetails$ = this.orderDetailService.asObservable();

  getOrderDetails() {
    return this.orderDetailService.value;
  }

  getDetailsByOrderId(orderId: number): OrderDetailI[] {
    return this.orderDetailService.value.filter(detail => detail.orderId === orderId);
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