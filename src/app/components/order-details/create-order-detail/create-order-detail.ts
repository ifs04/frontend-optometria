import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderDetailService } from '../../../services/order-detail.service';
import { LensI } from '../../../models/lens';
import { FrameI } from '../../../models/frame';
import { FrameService } from '../../../services/frame.service';
import { LensService } from '../../../services/lens.service';





@Component({
  selector: 'app-create-order-detail',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-order-detail.html',
  styleUrl: './create-order-detail.css',

})
export class CreateOrderDetail {
  lenses: LensI[] = [];
  frames: FrameI[] = [];

  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderDetailService: OrderDetailService,
    private lensService: LensService,
    private frameService: FrameService
  ) {
    this.form = this.fb.group({
      order_id: [null, Validators.required],
      product_type: ['LENS', Validators.required],
      product_id: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit_price: [0, [Validators.required, Validators.min(1)]],
      graduation: [''],
      status: ['ACTIVE', Validators.required]
    });

    this.lenses = this.lensService.getLenses();
    
  }

  get subtotal(): number {
    const qty = Number(this.form.get('quantity')?.value ?? 0);
    const price = Number(this.form.get('unit_price')?.value ?? 0);
    return qty * price;
  }

get availableProducts(): (LensI | FrameI)[] {
    const type = this.form.get('product_type')?.value;
    return type === 'LENS' ? this.lenses : this.frames;
  }

getProductLabel(product: LensI | FrameI): string {
  if ('type' in product && 'material' in product) {
    return `${product.type} (${product.material})`; // Lente
  } else if ('brand' in product && 'model' in product) {
    return `${product.brand} ${product.model}`; // Armazón
  }
  return 'Producto desconocido';
}


  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.orderDetailService.addOrderDetail({
        order_id: Number(value.order_id),
        product_type: value.product_type as 'LENS' | 'FRAME',
        product_id: Number(value.product_id),
        quantity: Number(value.quantity),
        unit_price: Number(value.unit_price),
        graduation: value.product_type === 'LENS' ? value.graduation ?? '' : '',
        subtotal: this.subtotal,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE', 
      });
      this.router.navigate(['/order-details']);
    }
  }

  cancelar() {
    this.router.navigate(['/order-details']);
  }
}
