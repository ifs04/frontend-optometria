import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AppointmentI } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:3000/appointments/public';
  private appointmentsSubject = new BehaviorSubject<AppointmentI[]>([ ]);
  public appointments$ = this.appointmentsSubject.asObservable();

  constructor(
    private http: HttpClient,
    
  ) {}

 getAllAppointments(): Observable<AppointmentI[]> {
    
    return this.http.get<AppointmentI[]>(this.baseUrl)
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched clients:', response);
    //     })
    // )
    ;
  }

  getAppointmentById(id: number): Observable<AppointmentI> {
    return this.http.get<AppointmentI>(`${this.baseUrl}/${id}`);
  }

  createAppointment(appointment: AppointmentI): Observable<AppointmentI> {
    return this.http.post<AppointmentI>(this.baseUrl, appointment);
  }

  updateAppointment(id: number, appointment: AppointmentI): Observable<AppointmentI> {
    return this.http.patch<AppointmentI>(`${this.baseUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteAppointmentLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`);
  }

  // Método para actualizar el estado local de clientes
  updateLocalAppointments(appointment: AppointmentI[]): void {
    this.appointmentsSubject.next(appointment);
  }

  refreshAppointments(): void {
    this.getAllAppointments().subscribe(appointment => {
      this.appointmentsSubject.next(appointment);
    });
  }
}
  

