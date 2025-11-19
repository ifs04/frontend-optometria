import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DeliveryI } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl = 'http://localhost:3000/deliveries/public';
  private deliveriesSubject = new BehaviorSubject<DeliveryI[]>([]);
  public deliveries$ = this.deliveriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todas las entregas
  getAllDeliveries(): Observable<DeliveryI[]> {
    return this.http.get<DeliveryI[]>(this.baseUrl);
  }

  // Obtener entrega por id
  getDeliveryById(id: number): Observable<DeliveryI> {
    return this.http.get<DeliveryI>(`${this.baseUrl}/${id}`);
  }

  // Crear entrega
  createDelivery(delivery: DeliveryI): Observable<DeliveryI> {
    return this.http.post<DeliveryI>(this.baseUrl, delivery);
  }

  // Actualizar entrega
  updateDelivery(id: number, delivery: DeliveryI): Observable<DeliveryI> {
    return this.http.patch<DeliveryI>(`${this.baseUrl}/${id}`, delivery);
  }

  // Eliminar entrega
  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Soft delete (si tu backend lo maneja)
  deleteDeliveryLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`);
  }

  // Actualizar estado local
  updateLocalDeliveries(deliveries: DeliveryI[]): void {
    this.deliveriesSubject.next(deliveries);
  }

  // Recargar desde el backend
  refreshDeliveries(): void {
    this.getAllDeliveries().subscribe(deliveries => {
      this.deliveriesSubject.next(deliveries);
    });
  }
}
