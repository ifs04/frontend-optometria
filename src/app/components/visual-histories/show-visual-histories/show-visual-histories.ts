import { Component,ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { VisualHistoryI } from '../../../models/visual-history';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { VisualHistoryService } from '../../../services/visual-history.service';


@Component({
  selector: 'app-show-visual-histories',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-visual-histories.html',
  styleUrl: './show-visual-histories.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowVisualHistories {
  visualHistories: VisualHistoryI[] = []

  constructor(private visualHistoryService: VisualHistoryService) {
    this.visualHistoryService.visualhistories$.subscribe(visualhistories => {
      this.visualHistories = visualhistories; 
    });
  }
}
