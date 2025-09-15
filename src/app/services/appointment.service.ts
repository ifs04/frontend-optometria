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
      patientId: 1, 
      optometristId: 1, 
      date: '2025-10-05',
      reason: 'Control por miopía y astigmatismo',
      status: 'PENDING'
    },
    {
      id: 2,
      patientId: 2, 
      optometristId: 2,
      date: '2025-10-20',
      reason: 'Revisión de adaptación a lentes correctivos',
      status: 'ATTENDED'
    },
    {
    id: 3,
    patientId: 3,
    optometristId: 3,
    date: '2025-11-05',
    reason: 'Control anual de visión',
    status: 'CANCELLED'
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
