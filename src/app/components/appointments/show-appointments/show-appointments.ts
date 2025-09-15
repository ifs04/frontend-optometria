import { Component,ViewEncapsulation } from '@angular/core';
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


@Component({
  selector: 'app-show-appointments',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-appointments.html',
  styleUrl: './show-appointments.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowAppointments {
  appointments: AppointmentI[] = [];
  patients: PatientI[] = [];
  optometrists: OptometristI[] = [];

  constructor(private appointmentService: AppointmentService,
    private patientService: PatientService,
    private optometristService: OptometristService
  ) {
    this.appointmentService.appointments$.subscribe(appointments => {
      this.appointments = appointments;
    });
    this.patientService.patients$.subscribe(data => {
      this.patients = data;
    });
    this.optometristService.optometrists$.subscribe(data => {
      this.optometrists = data;
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
