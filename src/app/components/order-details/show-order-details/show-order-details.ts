import { Component,ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OrderDetailI } from '../../../models/order-detail';
import { OrderDetailService } from '../../../services/order-detail.service';
import { LensI } from '../../../models/lens';
import { FrameI } from '../../../models/frame';
import { LensService } from '../../../services/lens.service';
import { FrameService } from '../../../services/frame.service';



@Component({
  selector: 'app-show-order-details',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-order-details.html',
  styleUrl: './show-order-details.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowOrderDetails {
   orderDetails: OrderDetailI[] = [];
   lenses: LensI[] = [];
   frames: FrameI[] = [];
constructor(
    private orderDetailService: OrderDetailService,
    private lensService: LensService,
    private frameService: FrameService
  ) {
    this.orderDetailService.orderDetails$.subscribe(data => {
      this.orderDetails = data;
    });

    // this.lenses = this.lensService.getLenses();
    this.frames = this.frameService.getFrames();
  }

  getProductName(type: 'LENS' | 'FRAME', id: number): string {
    if (type === 'LENS') {
      const lens = this.lenses.find(l => l.id === id);
      return lens ? `${lens.type} (${lens.material})` : 'Lente no encontrado';
    } else {
      const frame = this.frames.find(f => f.id === id);
      return frame ? `${frame.brand} ${frame.model}` : 'Armazón no encontrado';
    }
  }

  getProductImage(type: 'LENS' | 'FRAME', id: number): string {
    if (type === 'LENS') {
      const lens = this.lenses.find(l => l.id === id);
      return lens?.image || '';
    } else {
      const frame = this.frames.find(f => f.id === id);
      return frame?.image || '';
    }
  }
}
