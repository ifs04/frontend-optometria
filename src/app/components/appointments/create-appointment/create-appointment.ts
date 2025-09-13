import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { AppointmentService } from '../../../services/appointment.service';



@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css'
})
export class CreateAppointment {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      optometristId: ['', Validators.required],
      date: ['', Validators.required],
      reason: ['', Validators.required],
      status: ['PENDING', Validators.required] 
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.appointmentService.addAppointment({
        patientId: Number(value.patientId),
        optometristId: Number(value.optometristId),
        date: value.date ? new Date(value.date).toISOString().substring(0,16) : new Date().toISOString().substring(0,16),
        reason: value.reason ?? '',
        status: (value.status ?? 'PENDING') as "PENDING" | "ATTENDED" | "CANCELLED"
      });
      this.router.navigate(['/appointments']);
    }
  }

  cancelar() {
    this.router.navigate(['/appointments']);
  }

}
