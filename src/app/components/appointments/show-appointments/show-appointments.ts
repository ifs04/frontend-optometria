import { Component,ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AppointmentI } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment.service';


@Component({
  selector: 'app-show-appointments',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-appointments.html',
  styleUrl: './show-appointments.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowAppointments {
  appointments: AppointmentI[] = [];

  constructor(private appointmentService: AppointmentService) {
    this.appointmentService.appointments$.subscribe(appointments => {
      this.appointments = appointments;
    });
  }
}
