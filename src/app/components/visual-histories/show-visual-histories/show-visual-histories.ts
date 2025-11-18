import { Component,ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { VisualHistoryI } from '../../../models/visual-history';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { VisualHistoryService } from '../../../services/visual-history.service';
import { PatientService } from '../../../services/patient.service';
import { PatientI } from '../../../models/patient';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-show-visual-histories',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule,ConfirmDialogModule, ToastModule],
  templateUrl: './show-visual-histories.html',
  styleUrl: './show-visual-histories.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowVisualHistories {
  visualHistories: VisualHistoryI[] = []
  patients: PatientI[] = [];
  loading: boolean = false;

  constructor(private visualHistoryService: VisualHistoryService, 
    private patientService: PatientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

   ngOnInit(): void {
    this.loadVisualHistories();
  }
 loadVisualHistories(): void {
    this.loading = true;
    this.visualHistoryService.getAllVisualHistories().subscribe({
      next: (visualhistories) => {
        this.visualHistories = visualhistories;
        this.visualHistoryService.updateLocalVisualHistories(visualhistories);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading visual histories:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las historias visuales'
        });
        this.loading = false;
      }
    });
  }

  deleteVisualHistory(visualhistory: VisualHistoryI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la historia visual ${visualhistory.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (visualhistory.id) {
          this.visualHistoryService.deleteVisualHistory(visualhistory.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Historia visual eliminada correctamente'
              });
              this.loadVisualHistories();
            },
            error: (error) => {
              console.error('Error deleting visual history:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la historia visual'
              });
            }
          });
        }
      }
    });
  }
}