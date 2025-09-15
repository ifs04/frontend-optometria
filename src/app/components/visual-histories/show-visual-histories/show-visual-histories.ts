import { Component,ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { VisualHistoryI } from '../../../models/visual-history';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { VisualHistoryService } from '../../../services/visual-history.service';
import { PatientService } from '../../../services/patient.service';
import { PatientI } from '../../../models/patient';

@Component({
  selector: 'app-show-visual-histories',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule],
  templateUrl: './show-visual-histories.html',
  styleUrl: './show-visual-histories.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowVisualHistories {
  visualHistories: VisualHistoryI[] = []
  patients: PatientI[] = [];

  constructor(private visualHistoryService: VisualHistoryService, 
            private patientService: PatientService) {
    this.visualHistoryService.visualhistories$.subscribe(visualhistories => {
      this.visualHistories = visualhistories; 
    });
    this.patientService.patients$.subscribe(data => {
      this.patients = data;
    });
  }
  getPatientName(id: number): string {
    const patient = this.patients.find(p => p.id === id);
    return patient ? patient.name : 'Paciente no encontrado';
  }
}
