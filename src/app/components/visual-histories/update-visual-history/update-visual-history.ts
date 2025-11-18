import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { VisualHistoryService } from '../../../services/visual-history.service';
import { VisualHistoryI } from '../../../models/visual-history';


@Component({
  selector: 'app-update-patient',
  imports: [CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule],
  templateUrl: './update-visual-history.html',
  styleUrl: './update-visual-history.css',
  providers: [MessageService]
})
export class UpdateVisualHistory implements OnInit{
  form: FormGroup;
    loading: boolean = false;
    visualhistoryId: number = 0;
    statusOptions = [
      { label: 'Activo', value: 'ACTIVE' },
      { label: 'Inactivo', value: 'INACTIVE' }
    ];
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
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
  
    ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.visualhistoryId = parseInt(id);
      this.loadVisualHistory();
    }
  }

  loadVisualHistory(): void {
    this.loading = true;
    this.visualhistoryService.getVisualHistoryById(this.visualhistoryId).subscribe({
      next: (visualhistory) => {
        this.form.patchValue(visualhistory);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading visual history:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar la historia visual'
        });
        this.loading = false;
      }
    });
  }

   submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const visualhistoryData = this.form.value;

      this.visualhistoryService.updateVisualHistory(this.visualhistoryId, visualhistoryData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Historia visual actualizada correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/visual-histories']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating visual history:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar la historia visual'
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


