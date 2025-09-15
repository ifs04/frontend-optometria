import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderI } from '../../../models/order';
import { DeliveryService } from '../../../services/delivery.service';
import { OrderService } from '../../../services/order.service';



@Component({
  selector: 'app-create-delivery',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-delivery.html',
  styleUrl: './create-delivery.css'
})
export class CreateDelivery {
  form;
  orders: OrderI[] = [];

   constructor(
    private fb: FormBuilder,
    private router: Router,
    private deliveryService: DeliveryService,
    private orderService: OrderService
  ) {
    this.form = this.fb.group({
      orderId: [null, Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      status: ['PENDING', Validators.required],
      observations: ['']
    });

    this.orders = this.orderService.getOrders();
  }

  submit() {
    if (this.form.valid) {
      const raw = this.form.value;

      const delivery = {
        orderId: Number(raw.orderId),
        date: raw.date ?? new Date().toISOString().substring(0, 10),
        status: raw.status as 'PENDING' | 'READY' | 'DELIVERED',
        observations: raw.observations?.trim() || ''
      };

       this.deliveryService.addDelivery(delivery);
      this.router.navigate(['/deliveries']);
    }
  }

  cancelar() {
    this.router.navigate(['/deliveries']);
  }
}


