import { Component,  ViewEncapsulation} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PatientI } from '../../../models/patient';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../../services/patient.service';




@Component({
  selector: 'app-show-patients',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule],
  templateUrl: './show-patients.html',
  styleUrl: './show-patients.css',
  encapsulation: ViewEncapsulation.None
})

export class ShowPatients {
  patients: PatientI[] = [];

  constructor(private patientService: PatientService) {
    this.patientService.patients$.subscribe(patients => {
      this.patients = patients;
    });
  }

}
