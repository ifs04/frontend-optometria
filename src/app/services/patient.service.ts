import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PatientI } from '../models/patient';


@Injectable({
  providedIn: 'root'
})

export class PatientService {
private patientsService = new BehaviorSubject<PatientI[]>([
    {
      id: 1,
      name: 'Luisa Daza',
      age: 30,
      documentType: 'CC',
      documentNumber: '123456789',              
      gender: 'Male',
      phone: '3045987612',
      email: 'luisa@gmail.com',
      status: "ACTIVE"
    },
   
  ]);
  patients$ = this.patientsService.asObservable();

  getPatients() {
    return this.patientsService.value;
  }

  addPatient(patient: PatientI) {
    const patients = this.patientsService.value;
    patient.id = patients.length ? Math.max(...patients.map(c => c.id ?? 0)) + 1 : 1;
    this.patientsService.next([...patients, patient]);
  }
}