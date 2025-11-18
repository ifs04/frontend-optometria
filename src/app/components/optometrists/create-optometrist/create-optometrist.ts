import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { OptometristService } from '../../../services/optometrist.service';
@Component({
  selector: 'app-create-optometrist',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './create-optometrist.html',
  styleUrl: './create-optometrist.css'
})

export class CreateOptometrist {
  form;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private optometristService: OptometristService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      // this.optometristService.addOptometrist({
      //   name: value.name ?? '',
      //   specialty: value.specialty ?? '',
      //   phone: value.phone ?? '',
      //   email: value.email ?? '',
      //   status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE'
      // });
      this.router.navigate(['/optometrists']);
    }
  }

  cancelar() {
    this.router.navigate(['/optometrists']);
  }
}