import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DeliveryService } from '../../../services/delivery.service';
import { DeliveryI } from '../../../models/delivery';
import { OrderService } from '../../../services/order.service';
import { OrderI } from '../../../models/order';

@Component({
  selector: 'app-update-delivery',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './update-delivery.html',
  styleUrl: './update-delivery.css',
  providers: [MessageService]
})
export class UpdateDelivery implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  deliveryId: number = 0;

  orders: OrderI[] = []; // <-- NECESARIO

  statusOptions = [
    { label: 'Pendiente', value: 'PENDING' },
    { label: 'Listo', value: 'READY' },
    { label: 'Entregado', value: 'DELIVERED' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private orderService: OrderService,      // <-- NECESARIO
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      order_id: [0, Validators.required],
      date: ['', Validators.required],
      status: ['PENDING', Validators.required],
      observations: ['']
    });
  }

  ngOnInit(): void {
    this.loadOrders(); // <-- Cargar órdenes primero

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deliveryId = parseInt(id);
      this.loadDelivery();
    }
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders: OrderI[]) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error cargando órdenes:', error);
      }
    });
  }

  loadDelivery(): void {
    this.loading = true;

    this.deliveryService.getDeliveryById(this.deliveryId).subscribe({
      next: (delivery: DeliveryI) => {

        if (delivery.date) {
          const d = new Date(delivery.date);
          delivery.date = d.toISOString().slice(0, 10);
        }

        this.form.patchValue(delivery);
        this.loading = false;
      },

      error: (error) => {
        console.error('Error al cargar la entrega:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la entrega'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (!this.form.valid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    const deliveryData = this.form.value;

    this.deliveryService.updateDelivery(this.deliveryId, deliveryData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Entrega actualizada correctamente'
        });

        setTimeout(() => this.router.navigate(['/deliveries']), 1000);
      },
      error: (error) => {
        console.error('Error al actualizar la entrega:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la entrega'
        });
        this.loading = false;
      }
    });
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
    }
    return '';
  }
}
