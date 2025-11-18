import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { VisualHistoryService } from '../../../services/visual-history.service';
import { VisualHistoryI } from '../../../models/visual-history';

@Component({
  selector: 'app-create-visual-history',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule,ToastModule],
  templateUrl: './create-visual-history.html',
  styleUrl: './create-visual-history.css',
  providers: [MessageService]
})
export class CreateVisualHistory {
  form;
  loading: boolean = false;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private visualhistoryService: VisualHistoryService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
    patient_id: [0, Validators.required],
    observations: ['', Validators.required],
    date: [new Date(), Validators.required], 
    status: ['ACTIVE', Validators.required]
    });
  }

   submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const visualhistoryData = this.form.value as VisualHistoryI;

      this.visualhistoryService.createVisualHistory(visualhistoryData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Historia visual creada correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/visual-histories']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating visual history:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear la historia visual'
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
    this.router.navigate(['/visual-histories']);
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





 

