import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { PatientI } from '../models/patient';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private baseUrl = 'http://localhost:3000/patients/public';
  private patientsSubject = new BehaviorSubject<PatientI[]>([]);
  patients$ = this.patientsSubject.asObservable();

    constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

   private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


   getAllPatients(): Observable<PatientI[]> {
    return this.http.get<PatientI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched clients:', response);
    //     })
    // )
    ;
  }

  getPatientById(id: number): Observable<PatientI> {
    return this.http.get<PatientI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createPatient(patient: PatientI): Observable<PatientI> {
    return this.http.post<PatientI>(this.baseUrl, patient, { headers: this.getHeaders() });
  }

  updatePatient(id: number, patient: PatientI): Observable<PatientI> {
    return this.http.patch<PatientI>(`${this.baseUrl}/${id}`, patient, { headers: this.getHeaders() });
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deletePatientLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de clientes
  updateLocalPatients(patients: PatientI[]): void {
    this.patientsSubject.next(patients);
  }

  refreshPatients(): void {
    this.getAllPatients().subscribe(patients => {
      this.patientsSubject.next(patients);
    });
  }
}