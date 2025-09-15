import { Component,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DeliveryI } from '../../../models/delivery';
import { DeliveryService } from '../../../services/delivery.service';



@Component({
  selector: 'app-show-deliveries',
  imports: [CommonModule,TableModule,ButtonModule,RouterModule],
  templateUrl: './show-deliveries.html',
  styleUrl: './show-deliveries.css',
  encapsulation: ViewEncapsulation.None

})
export class ShowDeliveries {
  deliveries: DeliveryI[] = [];

  constructor(private deliveryService: DeliveryService) {
    this.deliveryService.deliveries$.subscribe(data => {
      this.deliveries = data;
    });
  }
}

  
