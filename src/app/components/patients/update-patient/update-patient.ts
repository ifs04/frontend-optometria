import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PatientService } from '../../../services/patient.service'; 
import { PatientI } from '../../../models/patient';


@Component({
  selector: 'app-update-patient',
  imports: [CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule],
  templateUrl: './update-patient.html',
  styleUrl: './update-patient.css',
  providers: [MessageService]
})
export class UpdatePatient implements OnInit{
  form: FormGroup;
    loading: boolean = false;
    patientId: number = 0;
    statusOptions = [
      { label: 'Activo', value: 'ACTIVE' },
      { label: 'Inactivo', value: 'INACTIVE' }
    ];
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
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
  
    ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientId = parseInt(id);
      this.loadPatient();
    }
  }

  loadPatient(): void {
    this.loading = true;
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (patient) => {
        this.form.patchValue(patient);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading patient:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el paciente'
        });
        this.loading = false;
      }
    });
  }

   submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const patientData = this.form.value;

      this.patientService.updatePatient(this.patientId, patientData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Paciente actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/patients']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating patient:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el paciente'
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