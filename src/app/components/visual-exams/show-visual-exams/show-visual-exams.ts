import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { VisualExamI } from '../../../models/visual-exam';
import { VisualExamService } from '../../../services/visual-exam.service';


@Component({
  selector: 'app-show-visual-exams',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-visual-exams.html',
  styleUrl: './show-visual-exams.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowVisualExams {
  visualExams: VisualExamI[] = [];

   constructor(private visualExamService: VisualExamService) {
    this.visualExamService.visualExams$.subscribe(visualExams => {
      this.visualExams = visualExams;
    });
  }
}
