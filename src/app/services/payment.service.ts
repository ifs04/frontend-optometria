import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaymentI } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:3000/payments/public'; 
  private paymentsSubject = new BehaviorSubject<PaymentI[]>([]);
  public payments$ = this.paymentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todos los pagos
  getAllPayments(): Observable<PaymentI[]> {
    return this.http.get<PaymentI[]>(this.baseUrl);
  }

  // Obtener pago por id
  getPaymentById(id: number): Observable<PaymentI> {
    return this.http.get<PaymentI>(`${this.baseUrl}/${id}`);
  }

  // Crear pago
  createPayment(payment: PaymentI): Observable<PaymentI> {
    return this.http.post<PaymentI>(this.baseUrl, payment);
  }

  // Actualizar pago
  updatePayment(id: number, payment: PaymentI): Observable<PaymentI> {
    return this.http.patch<PaymentI>(`${this.baseUrl}/${id}`, payment);
  }

  // Eliminar pago
  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Soft delete (si lo usas)
  deletePaymentLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`);
  }

  // Actualizar estado local
  updateLocalPayments(payments: PaymentI[]): void {
    this.paymentsSubject.next(payments);
  }

  // Recargar pagos desde backend
  refreshPayments(): void {
    this.getAllPayments().subscribe(payments => {
      this.paymentsSubject.next(payments);
    });
  }
}
