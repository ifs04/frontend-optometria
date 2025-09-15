import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderI } from '../../../models/order';
import { PaymentService } from '../../../services/payment.service';
import { OrderService } from '../../../services/order.service';
import { PaymentI } from '../../../models/payment';

@Component({
  selector: 'app-create-payment',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-payment.html',
  styleUrls: ['./create-payment.css'] // 👈 corregido
})
export class CreatePayment {
  form: FormGroup;
  payments: PaymentI[] = [];
  orders: OrderI[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {
    this.form = this.fb.group({
      orderId: [null, Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      method: ['CASH', Validators.required],
      status: ['PENDING', Validators.required]
    });

    this.orders = this.orderService.getOrders();
  }

  submit() {
    if (this.form.valid) {
      const raw = this.form.value;

      const payment: PaymentI = {
        orderId: Number(raw.orderId),
        date: raw.date,
        amount: Number(raw.amount),
        method: raw.method as 'CASH' | 'CARD' | 'TRANSFER',
        status: raw.status as 'PENDING' | 'COMPLETED' | 'FAILED'
      };

      this.paymentService.addPayment(payment);
      this.router.navigate(['/payments']);
    }
  }

  cancelar() {
    this.router.navigate(['/payments']);
  }
}
