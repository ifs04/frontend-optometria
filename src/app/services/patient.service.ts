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
      gender: 'Female',
      phone: '3045987612',
      email: 'luisa@gmail.com',
      status: "ACTIVE"
    },
    {
      id: 2,
      name: 'Maria Mengual',
      age: 20,
      documentType: 'TI',
      documentNumber: '12789631',              
      gender: 'Female',
      phone: '3159856612',
      email: 'Maria@gmail.com',
      status: "ACTIVE"
    },
    {
    id: 3,
    name: 'Juan Pérez',
    age: 45,
    documentType: 'CC',
    documentNumber: '1023456789',
    gender: 'Male',
    phone: '3123456789',
    email: 'juan.perez@gmail.com',
    status: "ACTIVE"
  },
  ]);
  patients$ = this.patientsService.asObservable();

  getPatients() {
    return this.patientsService.value;
  }

  addPatient(patient: PatientI) {
    const patients = this.patientsService.value;
    patient.id = patients.length ? Math.max(...patients.map(p => p.id ?? 0)) + 1 : 1;
    this.patientsService.next([...patients, patient]);
  }
}