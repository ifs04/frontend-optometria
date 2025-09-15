import { Component,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PaymentI } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';



@Component({
  selector: 'app-show-payments',
  imports: [CommonModule,TableModule,ButtonModule,RouterModule],
  templateUrl: './show-payments.html',
  styleUrl: './show-payments.css',
  encapsulation: ViewEncapsulation.None

})
export class ShowPayments {
  payments: PaymentI[] = [];

  constructor(private paymentService: PaymentService) {
    this.paymentService.payments$.subscribe(data => {
      this.payments = data;
    });
  }
}
