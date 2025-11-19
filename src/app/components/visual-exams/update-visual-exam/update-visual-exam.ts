import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { VisualExamService } from '../../../services/visual-exam.service';
import { VisualExamI } from '../../../models/visual-exam';


@Component({
  selector: 'app-update-visual-exam',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule,ToastModule],
  templateUrl: './update-visual-exam.html',
  styleUrl: './update-visual-exam.css',
  providers: [MessageService]
})
export class UpdateVisualExam implements OnInit{
  form: FormGroup;
  loading: boolean = false;
  visualexamId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private visualexamService: VisualExamService,
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
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.visualexamId = parseInt(id);
      this.loadVisualExam();
    }
  }

  loadVisualExam(): void {
    this.loading = true;
    this.visualexamService.getVisualExamById(this.visualexamId).subscribe({
      next: (exam) => {
        const patched = {
        appointment_id: exam.appointment_id,
        date: exam.date,
        prescription: exam.prescription || '',

        odEsf: exam.od?.esf,
        odCyl: exam.od?.cyl,
        odAxis: exam.od?.axis,
        odDp: exam.od?.dp,

        oiEsf: exam.oi?.esf,
        oiCyl: exam.oi?.cyl,
        oiAxis: exam.oi?.axis,
        oiDp: exam.oi?.dp,

        status: exam.status
      };

        this.form.patchValue(patched);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading visual exam:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el examen visual'
        });
        this.loading = false;
      }
    });
  }

   submit(): void {
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

      this.visualexamService.updateVisualExam(this.visualexamId, visualexamData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Examen visual actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/visual-exams']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating visual exam:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el examen visual'
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



