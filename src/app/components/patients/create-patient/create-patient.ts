import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PatientService } from '../../../services/patient.service';


@Component({
  selector: 'app-create-patient',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-patient.html',
  styleUrl: './create-patient.css'
})
export class CreatePatient {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService
    
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.patientService.addPatient({
        
        name: value.name ?? '',
        age: value.age ? Number(value.age) : 0,
        document_type: value.document_type ?? '',
        document_number: value.document_number ?? '',
        gender: value.gender === 'Male' || value.gender === 'Female' ? value.gender: 'Male',
        phone: value.phone ?? '',
        email: value.email ?? '',
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
      });
      this.router.navigate(['/patients']);
    }
  }

  cancelar() {
    this.router.navigate(['/patients']);
  }

}
