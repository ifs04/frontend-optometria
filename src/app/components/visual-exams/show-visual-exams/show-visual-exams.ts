import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { VisualExamI } from '../../../models/visual-exam';
import { VisualExamService } from '../../../services/visual-exam.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-show-visual-exams',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule,ConfirmDialogModule, ToastModule],
  templateUrl: './show-visual-exams.html',
  styleUrl: './show-visual-exams.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowVisualExams {
  visualExams: VisualExamI[] = [];
  loading: boolean = false;

   constructor(
    private visualExamService: VisualExamService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadVisualExams();
  }

  loadVisualExams(): void {
    this.loading = true;
    this.visualExamService.getAllVisualExams().subscribe({
      next: (exams) => {
        this.visualExams = exams;
        this.visualExamService.updateLocalVisualExams(exams);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading visual exams:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los exámenes visuales'
        });
        this.loading = false;
      }
    });
  }

  deleteVisualExam(exam: VisualExamI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el examen visual ${exam.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (exam.id) {
          this.visualExamService.deleteVisualExam(exam.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Examen visual eliminado correctamente'
              });
              this.loadVisualExams();
            },
            error: (error) => {
              console.error('Error deleting visual exam:', error);
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



