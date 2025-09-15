import { Component,ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OrderDetailI } from '../../../models/order-detail';
import { OrderDetailService } from '../../../services/order-detail.service';



@Component({
  selector: 'app-show-order-details',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-order-details.html',
  styleUrl: './show-order-details.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowOrderDetails {
   orderDetails: OrderDetailI[] = [];

  constructor(private orderDetailService: OrderDetailService) {
    this.orderDetailService.orderDetails$.subscribe(orderDetails => {
      this.orderDetails = orderDetails;
    });
  }
}