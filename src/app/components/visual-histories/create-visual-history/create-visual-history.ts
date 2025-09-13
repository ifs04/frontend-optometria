import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { VisualHistoryService } from '../../../services/visual-history.service';



@Component({
  selector: 'app-create-visual-history',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-visual-history.html',
  styleUrl: './create-visual-history.css'
})
export class CreateVisualHistory {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private visualhistoryService: VisualHistoryService
  ) {
    this.form = this.fb.group({
    patientId: ['', Validators.required],
    observations: ['', Validators.required],
    date: [new Date(), Validators.required], 
  });
  }

  submit() {
   if (this.form.valid) {
    const value = this.form.value;
    this.visualhistoryService.addHistories({
      patientId: Number(value.patientId), 
      observations: value.observations ?? '',
      date: value.date ?? new Date(), 
    });
    this.router.navigate(['/visual-histories']); 
  }

  }

  cancelar() {
    this.router.navigate(['/visual-histories']);
  }

}
