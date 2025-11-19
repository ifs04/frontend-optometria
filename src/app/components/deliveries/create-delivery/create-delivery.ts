import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { OrderService } from '../../../services/order.service';
import { DeliveryService } from '../../../services/delivery.service';

import { OrderI } from '../../../models/order';
import { DeliveryI } from '../../../models/delivery';

@Component({
  selector: 'app-create-delivery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './create-delivery.html',
  styleUrl: './create-delivery.css',
  providers: [MessageService]
})
export class CreateDelivery {
  form;
  loading: boolean = false;
  orders: OrderI[] = [];

  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private deliveryService: DeliveryService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      order_id: [null, Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      status: ['ACTIVE', Validators.required],
      observations: ['']
    });

    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response ;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los pedidos'
        });
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const raw = this.form.value;
      const delivery: DeliveryI = {
        order_id: Number(raw.order_id),
        date: raw.date as string,
        status: raw.status as "ACTIVE" | "INACTIVE",
        observations: raw.observations ?? ''
      };

      this.deliveryService.createDelivery(delivery).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Entrega registrada correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/deliveries']);
          }, 1000);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo registrar la entrega'
          });
          this.loading = false;
        }
      });

    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete los campos requeridos'
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/deliveries']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) return 'Formato no válido';
    }
    return '';
  }
}

