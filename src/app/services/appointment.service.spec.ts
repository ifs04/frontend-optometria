import { TestBed } from '@angular/core/testing';

import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
  let appointmentService: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    appointmentService = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(appointmentService).toBeTruthy();
  });
});