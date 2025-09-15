import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderService } from '../../../services/order.service';



@Component({
  selector: 'app-create-order',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css'
})
export class CreateOrder {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService
  ) {
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      optometristId: ['', Validators.required],
      date: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(1)]],
      status: ['PENDING', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.orderService.addOrder({
        patientId: Number(value.patientId),
        optometristId: Number(value.optometristId),
        date: value.date ? new Date(value.date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
        total: Number(value.total) ?? 0,
        status: (value.status ?? 'PENDING') as "PENDING" | "IN_PROCESS" | "DELIVERED" | "CANCELLED"
      });
      this.router.navigate(['/orders']);
    }
  }

  cancelar() {
    this.router.navigate(['/orders']);
  }
}