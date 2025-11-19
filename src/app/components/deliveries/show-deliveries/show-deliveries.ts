import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DeliveryI } from '../../../models/delivery';
import { DeliveryService } from '../../../services/delivery.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-show-deliveries',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './show-deliveries.html',
  styleUrl: './show-deliveries.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowDeliveries {
  deliveries: DeliveryI[] = [];
  loading: boolean = false;

  constructor(
    private deliveryService: DeliveryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
  this.loading = true;
  this.deliveryService.getAllDeliveries().subscribe({
    next: (deliveries) => {
      
      this.deliveries = deliveries;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading deliveries:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar las entregas'
      });
      this.loading = false;
    }
  });
}


  deleteDelivery(delivery: DeliveryI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la entrega #${delivery.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (delivery.id) {
          const updated = this.deliveries.filter(d => d.id !== delivery.id);
          // Actualizar BehaviorSubject
          (this.deliveryService as any).deliveriesService.next(updated);

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Entrega eliminada correctamente'
          });

          this.loadDeliveries();
        }
      }
    });
  }
}

