import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OrderI } from '../../../models/order';
import { OrderService } from '../../../services/order.service';


@Component({
  selector: 'app-show-orders',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-orders.html',
  styleUrl: './show-orders.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowOrders {
  orders: OrderI[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }
}