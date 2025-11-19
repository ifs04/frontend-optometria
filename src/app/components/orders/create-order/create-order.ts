import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
import { OptometristService } from '../../../services/optometrist.service';

import { PatientI } from '../../../models/patient';
import { OptometristI } from '../../../models/ optometrist';
import { OrderI } from '../../../models/order';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css',
  providers: [MessageService]
})
export class CreateOrder {
  form;
  loading: boolean = false;

  patients: PatientI[] = [];
  optometrists: OptometristI[] = [];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private patientService: PatientService,
    private optometristService: OptometristService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      patient_id: [0, Validators.required],
      optometrist_id: [0, Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      total: [0, [Validators.required, Validators.min(1)]],
      status: ['ACTIVE', Validators.required]
    });

    this.patientService.patients$.subscribe(data => {
      this.patients = data;
    });
    console.log('Patients loaded:', this.patients);

    this.optometristService.optometrists$.subscribe(data => {
      this.optometrists = data;
    });
  }

  submit(): void {
  if (this.form.invalid) {
    this.markFormTouched();
    this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Complete los campos' });
    return;
  }

  this.loading = true;

  const order = {
    ...this.form.value,
    patient_id: Number(this.form.value.patient_id),
    optometrist_id: Number(this.form.value.optometrist_id),
    total: Number(this.form.value.total)
  }  as OrderI;

  this.orderService.createOrder(order).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Orden creada correctamente'
      });
      setTimeout(() => this.router.navigate(['/orders']), 1000);
    },
    error: (error) => {
      console.error('Error creating order:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo crear la orden'
      });
    },
    complete: () => this.loading = false
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
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['min']) return `El valor mínimo es ${field.errors['min'].min}`;
      if (field.errors['email']) return 'Email no válido';
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) return 'Formato no válido';
    }
    return '';
  }
}
