import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { VisualExamService } from '../../../services/visual-exam.service';
import { VisualExamI } from '../../../models/visual-exam';


@Component({
  selector: 'app-create-visual-exam',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './create-visual-exam.html',
  styleUrl: './create-visual-exam.css',
  providers: [MessageService]
})
export class CreateVisualExam {
  form: FormGroup;
  loading: boolean = false;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

   constructor(
    private fb: FormBuilder,
    private router: Router,
    private visualExamService: VisualExamService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      appointment_id: ['', Validators.required],
      date: ['', Validators.required],
      prescription: [''],
      odEsf: ['', Validators.required],
      odCyl: ['', Validators.required],
      odAxis: ['', Validators.required],
      odDp: ['', Validators.required],
      oiEsf: ['', Validators.required],
      oiCyl: ['', Validators.required],
      oiAxis: ['', Validators.required],
      oiDp: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit(): void {
    console.log('Form data:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      const raw = this.form.value;

    const visualexamData: VisualExamI = {
      appointment_id: Number(raw.appointment_id),
      date: raw.date,
      prescription: raw.prescription || "",
      status: raw.status,

      od: {
        esf: Number(raw.odEsf),
        cyl: Number(raw.odCyl),
        axis: Number(raw.odAxis),
        dp: Number(raw.odDp)
      },

      oi: {
        esf: Number(raw.oiEsf),
        cyl: Number(raw.oiCyl),
        axis: Number(raw.oiAxis),
        dp: Number(raw.oiDp)
      }
    };

      this.visualExamService.createVisualExam(visualexamData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Examen visual creado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/visual-exams']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating visual exam:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el examen visual'
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
    this.router.navigate(['/visual-exams']);
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