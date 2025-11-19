import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { OrderDetailI } from '../../../models/order-detail';
import { OrderDetailService } from '../../../services/order-detail.service';

import { LensI } from '../../../models/lens';
import { FrameI } from '../../../models/frame';

import { LensService } from '../../../services/lens.service';
import { FrameService } from '../../../services/frame.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-show-order-details',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './show-order-details.html',
  styleUrl: './show-order-details.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowOrderDetails {
  orderDetails: OrderDetailI[] = [];
  lenses: LensI[] = [];
  frames: FrameI[] = [];
  loading: boolean = false;

  constructor(
    private orderDetailService: OrderDetailService,
    private lensService: LensService,
    private frameService: FrameService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
    this.loadLenses();
    this.loadFrames();
  }

  // --------------------------------------------------------------------------
  // LOADERS
  // --------------------------------------------------------------------------
  loadOrderDetails(): void {
    this.loading = true;
    this.orderDetailService.getAllOrderDetails().subscribe({
      next: (details) => {
        this.orderDetails = details;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los detalles de órdenes'
        });
        this.loading = false;
      }
    });
  }

  loadLenses(): void {
    this.lensService.getAllLenses().subscribe({
      next: (lenses) => (this.lenses = lenses)
    });
  }

  loadFrames(): void {
    this.frameService.getAllFrames().subscribe({
      next: (frames) => (this.frames = frames)
    });
  }

  // --------------------------------------------------------------------------
  // DELETE
  // --------------------------------------------------------------------------
  deleteOrderDetail(orderDetail: OrderDetailI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el detalle de orden #${orderDetail.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (orderDetail.id) {
          this.orderDetailService.deleteOrderDetail(orderDetail.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Detalle eliminado correctamente'
              });
              this.loadOrderDetails();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el detalle'
              });
            }
          });
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // HELPERS
  // --------------------------------------------------------------------------
  getProductName(type: 'LENS' | 'FRAME', id: number): string {
    if (type === 'LENS') {
      const lens = this.lenses.find(l => l.id === id);
      return lens ? `${lens.type} (${lens.material})` : 'Lente no encontrado';
    }

    const frame = this.frames.find(f => f.id === id);
    return frame ? `${frame.brand} ${frame.model}` : 'Armazón no encontrado';
  }

  getProductImage(type: 'LENS' | 'FRAME', id: number): string {
    if (type === 'LENS') {
      const lens = this.lenses.find(l => l.id === id);
      return lens?.image || '';
    }

    const frame = this.frames.find(f => f.id === id);
    return frame?.image || '';
  }
}
