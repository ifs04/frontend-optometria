import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DeliveryI } from '../models/delivery';



@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
private deliveriesService = new BehaviorSubject<DeliveryI[]>([
    {
      id: 1,
      orderId: 1,
      date: '2025-09-10',
      status: 'PENDING',
      observations: 'Esperando confirmación del cliente'
    },
    {
      id: 2,
      orderId: 2,
      date: '2025-09-11',
      status: 'DELIVERED',
      observations: 'Entregado en la óptica central'
    }
  ]);
  deliveries$ = this.deliveriesService.asObservable();

  getDeliveries() {
    return this.deliveriesService.value;
  }

  addDelivery(delivery: DeliveryI) {
    const deliveries = this.deliveriesService.value;
    delivery.id = deliveries.length ? Math.max(...deliveries.map(d => d.id ?? 0)) + 1 : 1;
    this.deliveriesService.next([...deliveries, delivery]);
  }
}