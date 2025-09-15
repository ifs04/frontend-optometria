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
      orderId: [null, Validators.required],
      productType: ['LENS', Validators.required],
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(1)]],
      graduation: ['']
    });

    this.lenses = this.lensService.getLenses();
    this.frames = this.frameService.getFrames();
  }

  get subtotal(): number {
    const qty = Number(this.form.get('quantity')?.value ?? 0);
    const price = Number(this.form.get('unitPrice')?.value ?? 0);
    return qty * price;
  }

get availableProducts(): (LensI | FrameI)[] {
    const type = this.form.get('productType')?.value;
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
        orderId: Number(value.orderId),
        productType: value.productType as 'LENS' | 'FRAME',
        productId: Number(value.productId),
        quantity: Number(value.quantity),
        unitPrice: Number(value.unitPrice),
        graduation: value.productType === 'LENS' ? value.graduation ?? '' : '',
        subtotal: this.subtotal
      });
      this.router.navigate(['/order-details']);
    }
  }

  cancelar() {
    this.router.navigate(['/order-details']);
  }
}
