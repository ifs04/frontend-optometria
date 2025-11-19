import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderI } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:3000/orders/public';

  private ordersSubject = new BehaviorSubject<OrderI[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todos
  getAllOrders(): Observable<OrderI[]> {
    return this.http.get<OrderI[]>(this.baseUrl);
  }

  // Obtener por ID
  getOrderById(id: number): Observable<OrderI> {
    return this.http.get<OrderI>(`${this.baseUrl}/${id}`);
  }

  // Crear
  createOrder(order: OrderI): Observable<OrderI> {
    return this.http.post<OrderI>(this.baseUrl, order);
  }

  // Actualizar
  updateOrder(id: number, order: OrderI): Observable<OrderI> {
    return this.http.patch<OrderI>(`${this.baseUrl}/${id}`, order);
  }

  // Eliminar físico
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Eliminación lógica
  deleteOrderLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`);
  }

  // Actualizar estado local
  updateLocalOrders(orders: OrderI[]): void {
    this.ordersSubject.next(orders);
  }

  // Refrescar desde API
  refreshOrders(): void {
    this.getAllOrders().subscribe(orders => {
      this.ordersSubject.next(orders);
    });
  }
}
