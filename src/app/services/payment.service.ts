import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PaymentI } from '../models/payment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
private paymentsService = new BehaviorSubject<PaymentI[]>([
     {
      id: 1,
      order_id: 1,
      date: '2025-09-12',
      amount: 250000,
      method: 'CASH',
      status: 'ACTIVE'
    },
    {
      id: 2,
      order_id: 2,
      date: '2025-09-11',
      amount: 480000,
      method: 'CARD',
      status: 'INACTIVE'
    }
  ]);
  payments$ = this.paymentsService.asObservable();

  getPayments() {
    return this.paymentsService.value;
  }

  addPayment(payment: PaymentI) {
    const payments = this.paymentsService.value;
    payment.id = payments.length ? Math.max(...payments.map(py => py.id ?? 0)) + 1 : 1;
    this.paymentsService.next([...payments, payment]);
  }
}