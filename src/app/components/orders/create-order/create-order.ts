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
      patientId: [null, Validators.required],
      optometristId: [null, Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      total: [0, [Validators.required, Validators.min(1)]],
      status: ['PENDING', Validators.required]
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

    const patientId = Number(raw.patientId ?? 0);
    const optometristId = Number(raw.optometristId ?? 0);

    const order: OrderI = {
      patientId,
      optometristId,
      date: raw.date ?? new Date().toISOString().substring(0, 10),
      total: Number(raw.total ?? 0),
      status: raw.status as 'PENDING' | 'IN_PROCESS' | 'DELIVERED' | 'CANCELLED'
    };

    this.orderService.addOrder(order);
    this.router.navigate(['/orders']);
  }

  }

  cancelar() {
    this.router.navigate(['/orders']);
  }
}