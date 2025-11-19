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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './create-payment.html',
  styleUrls: ['./create-payment.css'],
  providers: [MessageService]
})
export class CreatePayment {
  form: FormGroup;
  orders: OrderI[] = []; // ✅ NECESARIO PARA EL HTML

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {

    // 👇 IMPORTANTE: order_id debe coincidir con el HTML
    this.form = this.fb.group({
      order_id: [null, Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      method: ['CASH', Validators.required],
      status: ['ACTIVE', Validators.required]
    });

    this.loadOrders(); // ➕ CARGA DE ÓRDENES
  }

  // 🔄 Cargar órdenes desde backend
  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las órdenes'
        });
      }
    });
  }

  submit() {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Completa todos los campos.'
      });
      return;
    }

    const payment: PaymentI = this.form.value;

    this.paymentService.createPayment(payment).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Pago creado correctamente'
        });

        this.paymentService.refreshPayments();

        setTimeout(() => {
          this.router.navigate(['/payments']);
        }, 1000);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al crear el pago'
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/payments']);
  }
}
