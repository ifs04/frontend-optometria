import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppointmentService } from '../../../services/appointment.service';
import { AppointmentI } from '../../../models/appointment';

@Component({
  selector: 'app-update-appointment',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    
    ToastModule
  ],
  templateUrl: './update-appointment.html',
  styleUrl: './update-appointment.css',
  providers: [MessageService]
})
export class UpdateAppointment implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  appointmentId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentId = parseInt(id);
      this.loadAppointment();
    }
  }

  loadAppointment(): void {
    this.loading = true;
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (appointment: AppointmentI) => {
        
      if (appointment.date) {
        const dateObj = new Date(appointment.date);
       
        const formattedDate = dateObj.toISOString().slice(0, 16); 
        appointment.date = formattedDate;
      }
        this.form.patchValue(appointment);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar la cita:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la cita'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const appointmentData = this.form.value;

      this.appointmentService.updateAppointment(this.appointmentId, appointmentData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Cita actualizada correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/appointments']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar la cita:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la cita'
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
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
