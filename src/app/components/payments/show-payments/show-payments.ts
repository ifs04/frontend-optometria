import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

import { PaymentI } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-show-payments',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './show-payments.html',
  styleUrl: './show-payments.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService]
})
export class ShowPayments {

  payments: PaymentI[] = [];
  loading: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  // ==========================
  // Cargar pagos desde backend
  // ==========================
  loadPayments(): void {
    this.loading = true;

    this.paymentService.getAllPayments().subscribe({
      next: (payments) => {
        this.payments = payments;

        this.loading = false;
      },

      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los pagos'
        });
        this.loading = false;
      }
    });
  }

  // ==========================
  // Eliminar pago
  // ==========================
  deletePayment(payment: PaymentI): void {
    this.confirmationService.confirm({
      message: `¿Seguro que deseas eliminar el pago #${payment.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (payment.id) {
          this.paymentService.deletePayment(payment.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Pago eliminado correctamente'
              });

              // Recargar lista igual que citas
              this.loadPayments();
            },

            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el pago'
              });
            }
          });
        }
      }
    });
  }
}
