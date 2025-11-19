import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { OrderDetailService } from '../../../services/order-detail.service';
import { LensService } from '../../../services/lens.service';
import { FrameService } from '../../../services/frame.service';

import { LensI } from '../../../models/lens';
import { FrameI } from '../../../models/frame';
import { OrderDetailI } from '../../../models/order-detail';

@Component({
  selector: 'app-create-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './create-order-detail.html',
  styleUrl: './create-order-detail.css',
  providers: [MessageService]
})
export class CreateOrderDetail {

  form;
  loading = false;

  lenses: LensI[] = [];
  frames: FrameI[] = [];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderDetailService: OrderDetailService,
    private lensService: LensService,
    private frameService: FrameService,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      order_id: [0, Validators.required],
      product_type: ['LENS', Validators.required],
      product_id: [0, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit_price: [0, [Validators.required, Validators.min(1)]],
      graduation: [''],
      subtotal: [0, Validators.required],
      status: ['ACTIVE', Validators.required]
    });

    // 🔥 Actualizar subtotal automáticamente
    this.form.valueChanges.subscribe(() => {
      const qty = Number(this.form.get('quantity')?.value || 0);
      const price = Number(this.form.get('unit_price')?.value || 0);

      const subtotal = qty * price;
      this.form.get('subtotal')?.setValue(subtotal, { emitEvent: false });
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.lensService.getAllLenses().subscribe({
      next: (data) => this.lenses = data
    });

    this.frameService.getAllFrames().subscribe({
      next: (data) => this.frames = data
    });
  }

  get availableProducts(): (LensI | FrameI)[] {
    return this.form.get('product_type')?.value === 'LENS'
      ? this.lenses
      : this.frames;
  }

  getProductLabel(product: LensI | FrameI): string {
    if ('type' in product) return `${product.type} (${product.material})`;
    return `${product.brand} ${product.model}`;
  }

  submit(): void {
    if (!this.form.valid) {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Complete todos los campos requeridos'
      });
      return;
    }

    this.loading = true;

    const value = this.form.value;

    const productType = (value.product_type ?? 'LENS') as "LENS" | "FRAME";
    const status = (value.status ?? 'ACTIVE') as "ACTIVE" | "INACTIVE";

    const sendData: OrderDetailI = {
      order_id: Number(value.order_id),
      product_type: productType,
      product_id: Number(value.product_id),
      quantity: Number(value.quantity),
      unit_price: Number(value.unit_price),
      graduation: productType === 'LENS' ? value.graduation || '' : '',
      subtotal: Number(value.subtotal),
      status: status
    };

    this.orderDetailService.createOrderDetail(sendData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Detalle creado correctamente'
        });

        setTimeout(() => {
          this.router.navigate(['/order-details']);
        }, 1000);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el detalle'
        });
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/order-details']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['min']) return `Valor mínimo inválido`;
    }
    return '';
  }

}
