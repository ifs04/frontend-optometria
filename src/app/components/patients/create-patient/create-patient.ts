import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PatientService } from '../../../services/patient.service';
import { PatientI } from '../../../models/patient';


@Component({
  selector: 'app-create-patient',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule,ToastModule],
  templateUrl: './create-patient.html',
  styleUrl: './create-patient.css',
  providers: [MessageService]
})
export class CreatePatient {
  form;
  loading: boolean = false;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService,
    private messageService: MessageService

    
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: [0, Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit(): void {
      if (this.form.valid) {
        this.loading = true;
        const patientData = this.form.value as PatientI;
  
        this.patientService.createPatient(patientData).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Paciente creado correctamente'
            });
            setTimeout(() => {
              this.router.navigate(['/patients']);
            }, 1000);
          },
          error: (error) => {
            console.error('Error creating patient:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear el paciente'
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
      this.router.navigate(['/patients']);
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
  
   
  

 
