import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaymentService } from '../../../services/payment.service';
import { OrderService } from '../../../services/order.service';
import { PaymentI } from '../../../models/payment';
import { OrderI } from '../../../models/order';

@Component({
  selector: 'app-update-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './update-payment.html',
  styleUrls: ['./update-payment.css'],
  providers: [MessageService]
})
export class UpdatePayment implements OnInit {
  form: FormGroup;
  paymentId: number = 0;
  loading = false;

  orders: OrderI[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      order_id: [null, Validators.required],
      date: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      method: ['CASH', Validators.required],
      status: ['PENDING', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.paymentId = Number(id);
      this.loadOrders();
      this.loadPayment();
    }
  }

  // 🔄 Cargar órdenes para el select
  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => (this.orders = orders),
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las órdenes'
        });
      }
    });
  }

  // 🔄 Cargar datos del pago
  loadPayment() {
    this.loading = true;
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (payment: PaymentI) => {

        // Formatear fecha (yyyy-MM-dd)
        if (payment.date) {
          const dateObj = new Date(payment.date);
          payment.date = dateObj.toISOString().substring(0, 10);
        }

        this.form.patchValue(payment);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el pago'
        });
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Completa todos los campos obligatorios'
      });
      return;
    }

    const updatedPayment: PaymentI = this.form.value;

    this.paymentService.updatePayment(this.paymentId, updatedPayment).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Pago actualizado correctamente'
        });

        this.paymentService.refreshPayments();

        setTimeout(() => this.router.navigate(['/payments']), 1000);
      },
      error: (e) => {
        console.error(e);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el pago'
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/payments']);
  }
}
