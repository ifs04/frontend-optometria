import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LensService } from '../../../services/lens.service';
import { LensI } from '../../../models/lens';

@Component({
  selector: 'app-update-lens',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule,ToastModule],
  templateUrl: './update-lens.html',
  styleUrl: './update-lens.css',
  providers: [MessageService]
})
export class UpdateLens implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  lensesId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lensService: LensService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      material: ['', Validators.required],
      treatment: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      supplier_id: [0, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lensesId = parseInt(id);
      this.loadLens();
    }
  }

  loadLens(): void {
    this.loading = true;
    this.lensService.getLensById(this.lensesId).subscribe({
      next: (lens) => {
        this.form.patchValue(lens);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading lens:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el lente'
        });
        this.loading = false;
      }
    });
  }

   submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const lensData = this.form.value;

      this.lensService.updateLens(this.lensesId, lensData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Lente actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/lenses']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating lens:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el lente'
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
    this.router.navigate(['/lenses']);
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


