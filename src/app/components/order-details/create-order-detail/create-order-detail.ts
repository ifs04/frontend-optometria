import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderDetailService } from '../../../services/order-detail.service';





@Component({
  selector: 'app-create-order-detail',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-order-detail.html',
  styleUrl: './create-order-detail.css',

})
export class CreateOrderDetail {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderDetailService: OrderDetailService
  ) {
    this.form = this.fb.group({
      orderId: ['', Validators.required],
      productType: ['LENS', Validators.required],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      graduation: [''], 
    });
  }

  get subtotal(): number {
    const qty = Number(this.form.get('quantity')?.value ?? 0);
    const price = Number(this.form.get('unitPrice')?.value ?? 0);
    return qty * price;
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.orderDetailService.addOrderDetail({
        orderId: Number(value.orderId),
        productType: (value.productType ?? 'LENS') as 'LENS' | 'FRAME',
        productId: Number(value.productId),
        quantity: Number(value.quantity),
        unitPrice: Number(value.unitPrice),
        graduation: value.productType === 'LENS' ? value.graduation ?? '' : '', 
        subtotal: this.subtotal, 
      });
      this.router.navigate(['/order-details']);
    }
  }

  cancelar() {
    this.router.navigate(['/order-details']);
  }
}