import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { OrderI } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { PatientI } from '../../../models/patient';
import { OptometristI } from '../../../models/ optometrist';
import { PatientService } from '../../../services/patient.service';
import { OptometristService } from '../../../services/optometrist.service';

@Component({
  selector: 'app-show-orders',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './show-orders.html',
  styleUrl: './show-orders.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowOrders {
  orders: OrderI[] = [];
  patients: PatientI[] = [];
  optometrists: OptometristI[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private patientService: PatientService,
    private optometristService: OptometristService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadPatients();
    this.loadOptometrists();
  }

  loadOrders(): void {
    this.loading = true;

    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        
        this.orders = orders;
        this.orderService.updateLocalOrders(orders);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las órdenes'
        });
        this.loading = false;
      }
    });
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.patientService.updateLocalPatients(patients);
      }
    });
  }

  loadOptometrists(): void {
    this.optometristService.getAllOptometrists().subscribe({
      next: (opto) => {
        this.optometrists = opto;
        this.optometristService.updateLocalOptometrist(opto);
      }
    });
  }

  deleteOrder(order: OrderI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar esta orden ${order.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (order.id) {
          this.orderService.deleteOrder(order.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Orden eliminada correctamente'
              });
              this.loadOrders();
            },
            error: (error) => {
              console.error('Error deleting order:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la orden'
              });
            }
          });
        }
      }
    });
  }

  getPatientName(id: number): string {
    
    const patient = this.patients.find(p => p.id === id);
    return patient ? patient.name : 'Paciente no encontrado';
  }

  getOptometristName(id: number): string {
    const opto = this.optometrists.find(o => o.id === id);
    return opto ? opto.name : 'Optometrista no encontrado';
  }
}
