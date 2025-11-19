import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AppointmentI } from '../../../models/appointment';
import { PatientI } from '../../../models/patient';
import { OptometristI } from '../../../models/ optometrist';
import { AppointmentService } from '../../../services/appointment.service';
import { OptometristService } from '../../../services/optometrist.service';
import { PatientService } from '../../../services/patient.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-show-appointments',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule,ConfirmDialogModule, ToastModule],
  templateUrl: './show-appointments.html',
  styleUrl: './show-appointments.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowAppointments {
  appointments: AppointmentI[] = [];
  patients: PatientI[] = [];
  optometrists: OptometristI[] = [];
  loading: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private optometristService: OptometristService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.loadOptometrists();
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las citas'
        });
        this.loading = false;
      }
    });
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (patients) => this.patients = patients
    });
  }

  loadOptometrists(): void {
    this.optometristService.getAllOptometrists().subscribe({
      next: (opto) => this.optometrists = opto
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

  deleteAppointment(appointment: AppointmentI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar esta cita ${appointment.id}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (appointment.id) {
          this.appointmentService.deleteAppointment(appointment.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Cita eliminada correctamente'
              });
              this.loadAppointments();
            },
            error: () => {
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
