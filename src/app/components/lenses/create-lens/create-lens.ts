import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LensService } from '../../../services/lens.service';


@Component({
  selector: 'app-create-lens',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-lens.html',
  styleUrl: './create-lens.css'
})
export class CreateLens {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lensService: LensService
  ) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      material: ['', Validators.required],
      treatment: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      supplierId: [0, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.lensService.addLens({
        type: value.type ?? '',
        material: value.material ?? '',
        treatment: value.treatment ?? '',
        price: value.price ?? 0,
        stock: value.stock ?? 0,
        supplier_id: value.supplierId ?? 0,
        image: value.image ?? '',
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE'
      });
      this.router.navigate(['/lenses']);
    }
  }

  cancelar() {
    this.router.navigate(['/lenses']);
  }
}