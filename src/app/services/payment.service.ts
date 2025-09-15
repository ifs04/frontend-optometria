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
      orderId: 1,
      date: '2025-09-12',
      amount: 250000,
      method: 'CASH',
      status: 'COMPLETED'
    },
    {
      id: 2,
      orderId: 2,
      date: '2025-09-11',
      amount: 480000,
      method: 'CARD',
      status: 'PENDING'
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