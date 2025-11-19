import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { OrderDetailI } from '../models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private baseUrl = 'http://localhost:3000/order-details/public'; 
  private orderDetailsSubject = new BehaviorSubject<OrderDetailI[]>([]);
  public orderDetails$ = this.orderDetailsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todos los detalles de órdenes desde backend
  getAllOrderDetails(): Observable<OrderDetailI[]> {
    return this.http.get<OrderDetailI[]>(this.baseUrl).pipe(
      tap(details => this.orderDetailsSubject.next(details))
    );
  }

  // Obtener detalles por ID de orden
  getDetailsByOrderId(order_id: number): Observable<OrderDetailI[]> {
    return this.http.get<OrderDetailI[]>(`${this.baseUrl}/order/${order_id}`);
  }

  // Obtener detalle por ID
  getDetailById(id: number): Observable<OrderDetailI> {
    return this.http.get<OrderDetailI>(`${this.baseUrl}/${id}`);
  }

  // Crear nuevo detalle
  createOrderDetail(detail: OrderDetailI): Observable<OrderDetailI> {
    return this.http.post<OrderDetailI>(this.baseUrl, detail).pipe(
      tap(() => this.refreshOrderDetails())
    );
  }

  // Actualizar detalle
  updateOrderDetail(id: number, detail: OrderDetailI): Observable<OrderDetailI> {
    return this.http.patch<OrderDetailI>(`${this.baseUrl}/${id}`, detail).pipe(
      tap(() => this.refreshOrderDetails())
    );
  }

  // Eliminar detalle
  deleteOrderDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.refreshOrderDetails())
    );
  }

  // Actualizar el estado local
  updateLocalOrderDetails(details: OrderDetailI[]): void {
    this.orderDetailsSubject.next(details);
  }

  // Refrescar desde backend
  refreshOrderDetails(): void {
    this.getAllOrderDetails().subscribe(details => {
      this.orderDetailsSubject.next(details);
    });
  }
}
