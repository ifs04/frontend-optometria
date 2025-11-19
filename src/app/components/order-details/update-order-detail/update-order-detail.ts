import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { OrderDetailService } from '../../../services/order-detail.service';
import { LensService } from '../../../services/lens.service';
import { FrameService } from '../../../services/frame.service';

import { LensI } from '../../../models/lens';
import { FrameI } from '../../../models/frame';

@Component({
  selector: 'app-update-order-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './update-order-detail.html',
  styleUrl: './update-order-detail.css',
  providers: [MessageService]
})
export class UpdateOrderDetail implements OnInit {

  form!: FormGroup;
  loading: boolean = false;
  orderDetailId: number = 0;

  lenses: LensI[] = [];
  frames: FrameI[] = [];

  statusOptions = [
    { label: "Activo", value: "ACTIVE" },
    { label: "Inactivo", value: "INACTIVE" }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private lensService: LensService,
    private frameService: FrameService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      order_id: [null, Validators.required],
      product_type: ['LENS', Validators.required],
      product_id: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit_price: [0, [Validators.required, Validators.min(1)]],
      graduation: [''],
      subtotal: [{ value: 0, disabled: true }],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderDetailId = parseInt(id);
    }

    this.loadProducts();
    this.loadOrderDetail();

    // recalcular subtotal cuando cambian qty o price
    this.form.get('quantity')?.valueChanges.subscribe(() => this.updateSubtotal());
    this.form.get('unit_price')?.valueChanges.subscribe(() => this.updateSubtotal());
  }

  loadProducts(): void {
    this.lensService.getAllLenses().subscribe(data => (this.lenses = data));
    this.frameService.getAllFrames().subscribe(data => (this.frames = data));
  }

  loadOrderDetail(): void {
    this.loading = true;

    this.orderDetailService.getDetailById(this.orderDetailId)
      .subscribe({
        next: (detail) => {
          this.form.patchValue(detail);
          this.updateSubtotal();
          this.loading = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar el detalle de la orden'
          });
          this.loading = false;
        }
      });
  }

  /** Recalcular subtotal */
  updateSubtotal(): void {
    const qty = Number(this.form.get('quantity')?.value || 0);
    const price = Number(this.form.get('unit_price')?.value || 0);
    const subtotal = qty * price;

    this.form.get('subtotal')?.setValue(subtotal, { emitEvent: false });
  }

  get availableProducts(): (LensI | FrameI)[] {
    const type = this.form.get('product_type')?.value;
    return type === 'LENS' ? this.lenses : this.frames;
  }

  getProductLabel(product: LensI | FrameI): string {
    if ('type' in product) {
      return `${product.type} (${product.material})`; // Lente
    }
    return `${product.brand} ${product.model}`; // Armazón
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

    const payload = {
      ...this.form.getRawValue(),
      subtotal: this.form.get('subtotal')?.value
    };

    this.orderDetailService.updateOrderDetail(this.orderDetailId, payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Detalle de orden actualizado correctamente'
        });
        setTimeout(() => {
          this.router.navigate(['/order-details']);
        }, 800);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el detalle de la orden'
        });
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/order-details']);
  }

  private markFormGroupTouched(): void {
    Object.values(this.form.controls).forEach(control => control.markAsTouched());
  }
}
