import { Component,  ViewEncapsulation} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PatientI } from '../../../models/patient';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-show-patients',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule,ConfirmDialogModule, ToastModule],
  templateUrl: './show-patients.html',
  styleUrl: './show-patients.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})

export class ShowPatients {
  patients: PatientI[] = [];
  loading: boolean = false;

    constructor(private patientService: PatientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  
  ngOnInit(): void {
    this.loadPatients();
  }


   loadPatients(): void {
    this.loading = true;
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.patientService.updateLocalPatients(patients);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los pacientes'
        });
        this.loading = false;
      }
    });
  }

  deletePatient(patient: PatientI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el paciente ${patient.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (patient.id) {
          this.patientService.deletePatient(patient.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Paciente eliminado correctamente'
              });
              this.loadPatients();
            },
            error: (error) => {
              console.error('Error deleting patient:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el paciente'
              });
            }
          });
        }
      }
    });
  }
}


