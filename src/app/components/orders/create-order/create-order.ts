import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderService } from '../../../services/order.service';
import { PatientI } from '../../../models/patient';
import { OptometristI } from '../../../models/ optometrist';
import { PatientService } from '../../../services/patient.service';
import { OptometristService } from '../../../services/optometrist.service';
import { OrderI } from '../../../models/order';



@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css'
})
export class CreateOrder {
  form;
  patients: PatientI[] = [];
  optometrists: OptometristI[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private patientService: PatientService,
    private optometristService: OptometristService


  ) {
    this.form = this.fb.group({
      patient_id: [null, Validators.required],
      optometrist_id: [null, Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      total: [0, [Validators.required, Validators.min(1)]],
      status: ['ACTIVE', Validators.required]
    });

    this.patientService.patients$.subscribe(data => {
      this.patients = data;
    });

    this.optometristService.optometrists$.subscribe(data => {
      this.optometrists = data;
    });
  }

  submit() {
    if (this.form.valid) {
    const raw = this.form.value;

    const patient_id = Number(raw.patient_id ?? 0);
    const optometrist_id = Number(raw.optometrist_id ?? 0);

    const order: OrderI = {
      patient_id,
      optometrist_id,
      date: raw.date ?? new Date().toISOString().substring(0, 10),
      total: Number(raw.total ?? 0),
      status: raw.status as 'ACTIVE' | 'INACTIVE' 
    };

    this.orderService.addOrder(order);
    this.router.navigate(['/orders']);
  }

  }

  cancelar() {
    this.router.navigate(['/orders']);
  }
}