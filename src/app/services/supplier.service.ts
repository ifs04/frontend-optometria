import { Injectable } from '@angular/core';
import { SupplierI } from '../models/supplier';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AppointmentI } from '../models/appointment';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  
  private baseUrl = 'http://localhost:3000/suppliers/public';
  private appointmentsSubject = new BehaviorSubject<SupplierI[]>([ ]);
  public appointments$ = this.appointmentsSubject.asObservable();

  constructor(
    private http: HttpClient,
    
  ) {}
  getAllSuppliers(): Observable<SupplierI[]> {
      
      return this.http.get<SupplierI[]>(this.baseUrl)
      // .pipe(
      //   tap(response => {
      //       // console.log('Fetched clients:', response);
      //     })
      // )
      ;
    }
  
    getSupplierById(id: number): Observable<SupplierI> {
      return this.http.get<SupplierI>(`${this.baseUrl}/${id}`);
    }
  
    createSupplier(supplier: SupplierI): Observable<SupplierI> {
      return this.http.post<SupplierI>(this.baseUrl, supplier);
    }
  
    updateSupplier(id: number, supplier: SupplierI): Observable<SupplierI> {
      return this.http.patch<SupplierI>(`${this.baseUrl}/${id}`, supplier);
    }
  
    deleteSupplier(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  
    deleteSupplierLogic(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}/logic`);
    }
  
    // Método para actualizar el estado local de clientes
    updateLocalSuppliers(suppliers: SupplierI[]): void {
      this.appointmentsSubject.next(suppliers);
    }
  
    refreshAppointments(): void {
      this.getAllSuppliers().subscribe(supplier => {
        this.appointmentsSubject.next(supplier);
      });
    }
}