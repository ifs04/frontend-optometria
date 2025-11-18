import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { OptometristService } from '../../../services/optometrist.service';
import { OptometristI } from '../../../models/ optometrist';

@Component({
  selector: 'app-update-optometrist',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule,ToastModule],
  templateUrl: './update-optometrist.html',
  styleUrl: './update-optometrist.css',
  providers: [MessageService]
})
export class UpdateOptometrist implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  optometristId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private optometristService: OptometristService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

   ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.optometristId = parseInt(id);
      this.loadOptometrist();
    }
  }

   loadOptometrist(): void {
    this.loading = true;
    this.optometristService.getOptometristById(this.optometristId).subscribe({
      next: (optometrist) => {
        this.form.patchValue(optometrist);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading optometrist:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el optometrista'
        });
        this.loading = false;
      }
    });
  }

   submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const optometristData = this.form.value;

      this.optometristService.updateOptometrist(this.optometristId, optometristData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Optometrista actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/optometrists']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating optometrist:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el optometrista'
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
    this.router.navigate(['/optometrists']);
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



