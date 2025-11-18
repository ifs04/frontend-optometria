import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SupplierI } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-show-suppliers',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule, ConfirmDialogModule, ToastModule],
  templateUrl: './show-suppliers.html',
  styleUrl: './show-suppliers.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})

export class ShowSuppliers {
  suppliers: SupplierI[] = [];
  loading: boolean = false;
  constructor(
    private supplierService: SupplierService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
      this.loadSuppliers();
  }
  loadSuppliers(): void {
    this.loading = true;
    this.supplierService.getAllSuppliers().subscribe({
      next: (suppliers) => {
        console.log('Loaded suppliers:', suppliers);
        this.suppliers = suppliers;
        this.supplierService.updateLocalSuppliers(suppliers);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los appointments'
        });
        this.loading = false;
      }
    });
  }
  deleteSupplier(supplier: SupplierI): void {
      this.confirmationService.confirm({
        message: `¿Está seguro de eliminar este proveedor ${supplier.id}?`,
        header: 'Confirmar eliminación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (supplier.id) {
            this.supplierService.deleteSupplier(supplier.id).subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Éxito',
                  detail: 'Proveedor eliminado correctamente'
                });
                this.loadSuppliers();
              },
              error: (error) => {
                console.error('Error deleting supplier:', error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Error al eliminar la cita'
                });
              }
            });
          }
        }
      });
    }
}