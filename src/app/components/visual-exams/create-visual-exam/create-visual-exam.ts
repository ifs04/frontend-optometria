import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { VisualExamService } from '../../../services/visual-exam.service';



@Component({
  selector: 'app-create-visual-exam',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-visual-exam.html',
  styleUrl: './create-visual-exam.css'
})
export class CreateVisualExam {
  form;
   constructor(
    private fb: FormBuilder,
    private router: Router,
    private visualExamService: VisualExamService
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

  submit() {
    if (this.form.valid) {
      const value = this.form.value;

      this.visualExamService.addVisualExam({
        appointment_id: Number(value.appointment_id),
        date: value.date ?? '',
        prescription: value.prescription ?? '',
        od: {
          esf: Number(value.odEsf),
          cyl: Number(value.odCyl),
          axis: Number(value.odAxis),
          dp: Number(value.odDp)
        },
        oi: {
          esf: Number(value.oiEsf),
          cyl: Number(value.oiCyl),
          axis: Number(value.oiAxis),
          dp: Number(value.oiDp)
        },
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
      });

      this.router.navigate(['/visual-exams']);
    }
  }

  cancelar() {
    this.router.navigate(['/visual-exams']);
  }
}