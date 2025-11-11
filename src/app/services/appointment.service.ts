import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppointmentI } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsService = new BehaviorSubject<AppointmentI[]>([
    {
      id: 1,
      patient_id: 1, 
      optometrist_id: 1, 
      date: '2025-10-05',
      reason: 'Control por miopía y astigmatismo',
      status: 'ACTIVE'
    },
  ]);
  appointments$ = this.appointmentsService.asObservable();

  getAppointments() {
    return this.appointmentsService.value;
  }

  addAppointment(appointment: AppointmentI) {
    const appointments = this.appointmentsService.value;
    appointment.id = appointments.length ? Math.max(...appointments.map(p => p.id ?? 0)) + 1 : 1;
    this.appointmentsService.next([...appointments, appointment]);
  }
  
}
