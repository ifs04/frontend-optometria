import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
import { OptometristService } from '../../../services/optometrist.service';

import { OrderI } from '../../../models/order';
import { PatientI } from '../../../models/patient';
import { OptometristI } from '../../../models/ optometrist';

@Component({
  selector: 'app-update-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './update-order.html',
  styleUrl: './update-order.css',
  providers: [MessageService]
})
export class UpdateOrder implements OnInit {

  form!: FormGroup;
  loading = false;
  orderId = 0;

  patients: PatientI[] = [];
  optometrists: OptometristI[] = [];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private patientService: PatientService,
    private optometristService: OptometristService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      patient_id: [0, Validators.required],
      optometrist_id: [0, Validators.required],
      date: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(1)]],
      status: ['ACTIVE', Validators.required]
    });

    this.patientService.patients$.subscribe(data => this.patients = data);
    this.optometristService.optometrists$.subscribe(data => this.optometrists = data);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderId = Number(id);
      this.loadOrder();
    }
  }

  loadOrder(): void {
    this.loading = true;

    this.orderService.getOrderById(this.orderId).subscribe({
      next: (order: OrderI) => {

        // Parsear fecha como en UpdateAppointment
        if (order.date) {
          const dateObj = new Date(order.date);

          // Si el backend manda solo fecha → se convierte igual a ISO
          const formattedDate = dateObj.toISOString().slice(0, 16);

          order.date = formattedDate;
        }

        // Normalizar valores numéricos
        order.patient_id = Number(order.patient_id);
        order.optometrist_id = Number(order.optometrist_id);
        order.total = Number(order.total);

        this.form.patchValue(order);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la orden'
        });
        this.loading = false;
      }
    });
  }


  submit(): void {
    if (!this.form.valid) {
      this.markFormTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Complete todos los campos requeridos'
      });
      return;
    }

    this.loading = true;

    const order: OrderI = {
      ...this.form.value,
      patient_id: Number(this.form.value.patient_id),
      optometrist_id: Number(this.form.value.optometrist_id),
      total: Number(this.form.value.total)
    };

    this.orderService.updateOrder(this.orderId, order).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Orden actualizada correctamente'
        });

        setTimeout(() => this.router.navigate(['/orders']), 1000);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la orden'
        });
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/orders']);
  }

  private markFormTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['min']) return `El valor mínimo es ${field.errors['min'].min}`;
    }
    return '';
  }
}

