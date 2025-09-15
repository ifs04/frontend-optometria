import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';

describe('PatientService', () => {
  let patientService: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    patientService = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(patientService).toBeTruthy();
  });
});