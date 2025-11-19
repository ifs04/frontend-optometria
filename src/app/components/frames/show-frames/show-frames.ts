import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { FrameI } from '../../../models/frame';
import { FrameService } from '../../../services/frame.service';
import { SupplierI } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-show-frames',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    TagModule,
    RatingModule,
    ImageModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './show-frames.html',
  styleUrl: './show-frames.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowFrames implements OnInit {

  frames: FrameI[] = [];
  suppliers: SupplierI[] = [];
  loading: boolean = false;

  constructor(
    private frameService: FrameService,
    private supplierService: SupplierService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadFrames();
  }

  loadFrames(): void {
    this.loading = true;
    this.frameService.getAllFrames().subscribe({
      next: (frames) => {
        this.frames = frames;
        this.frameService.updateLocalFrames(frames);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los marcos'
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

  deleteFrame(frame: FrameI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar este marco ${frame.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (frame.id) {
          this.frameService.deleteFrame(frame.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Marco eliminado correctamente'
              });
              this.loadFrames();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el marco'
              });
            }
          });
        }
      }
    });
  }
}
