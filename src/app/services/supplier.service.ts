import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SupplierI } from '../models/supplier';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliersService = new BehaviorSubject<SupplierI[]>([
     {
      id: 1,
      name: 'Ópticas Visión Global',
      phone: '601-5551234',
      email: 'contacto@visionglobal.com',
      address: 'Calle 45 #10-23, Bogotá',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Distribuidora Lentes del Caribe',
      phone: '605-5678901',
      email: 'ventas@lentescaribe.com',
      address: 'Carrera 30 #22-18, Barranquilla',
      status: 'INACTIVE'
    },
  ]);
  suppliers$ = this.suppliersService.asObservable();

  getSuppliers() {
    return this.suppliersService.value;
  }

  addSupplier(supplier: SupplierI) {
    const suppliers = this.suppliersService.value;
    supplier.id = suppliers.length ? Math.max(...suppliers.map(s => s.id ?? 0)) + 1 : 1;
    this.suppliersService.next([...suppliers, supplier]);
  }
}