import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppointmentService } from '../../../services/appointment.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppointmentI } from '../../../models/appointment';


@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
  providers: [MessageService]
})
export class CreateAppointment {
  form;
  loading: boolean = false;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      patient_id: [0,Validators.required],
      optometrist_id: [ 0,Validators.required],
      date: ['', Validators.required],
      reason: ['', Validators.required],
      status: ['ACTIVE', Validators.required] 
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const appointmentData = this.form.value as AppointmentI;

      this.appointmentService.createAppointment(appointmentData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Cliente creado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/appointments']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating client:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el cliente'
          });
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/appointments']);
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
      if (field.errors['email']) return 'Email no válido';
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) return 'Formato no válido';
    }
    return '';
  }
}

 
