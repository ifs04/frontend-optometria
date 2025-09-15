import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OrderI } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { PatientI } from '../../../models/patient';
import { OptometristI } from '../../../models/ optometrist';
import { PatientService } from '../../../services/patient.service';
import { OptometristService } from '../../../services/optometrist.service';


@Component({
  selector: 'app-show-orders',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-orders.html',
  styleUrl: './show-orders.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowOrders {
  orders: OrderI[] = [];
  patients: PatientI[] = [];
  optometrists: OptometristI[] = [];

constructor(
    private orderService: OrderService,
    private patientService: PatientService,
    private optometristService: OptometristService
  ) {
    this.orderService.orders$.subscribe(data => {
      this.orders = data;
    });

    this.patientService.patients$.subscribe(data => {
      this.patients = data;
    });

    this.optometristService.optometrists$.subscribe(data => {
      this.optometrists = data;
    });
  }

  getPatientName(id: number): string {
    const patient = this.patients.find(p => p.id === id);
    return patient ? patient.name : 'Paciente no encontrado';
  }

  getOptometristName(id: number): string {
    const opto = this.optometrists.find(o => o.id === id);
    return opto ? opto.name : 'Optometrista no encontrado';
  }
}
