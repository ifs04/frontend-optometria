import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { LensI } from '../../../models/lens';
import { LensService } from '../../../services/lens.service';
import { SupplierI } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-show-lenses',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule, TagModule, ImageModule, ConfirmDialogModule, ToastModule],
  templateUrl: './show-lenses.html',
  styleUrl: './show-lenses.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowLenses implements OnInit {
  lenses: LensI[] = [];
  suppliers: SupplierI[] = [];
  loading: boolean = false;

  constructor(
    private lensService: LensService,
    private supplierService: SupplierService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadLenses();
  }

  loadLenses(): void {
    this.loading = true;
    this.lensService.getAllLenses().subscribe({
      next: (lenses) => {
        this.lenses = lenses;
        this.lensService.updateLocalLenses(lenses);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los lentes'
        });
        this.loading = false;
      }
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (suppliers) => this.suppliers = suppliers
    });
  }

  getSupplierName(id: number): string {
    const supplier = this.suppliers.find(s => s.id === id);
    return supplier ? supplier.name : 'Proveedor no encontrado';
  }

  deleteLens(lens: LensI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el lente ${lens.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (lens.id) {
          this.lensService.deleteLens(lens.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Lente eliminado correctamente'
              });
              this.loadLenses();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el lente'
              });
            }
          });
        }
      }
    });
  }
}
