import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SupplierService } from '../../../services/supplier.service';



@Component({
  selector: 'app-create-supplier',
  imports: [CommonModule,ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-supplier.html',
  styleUrl: './create-supplier.css'
})
export class CreateSupplier {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierService: SupplierService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.supplierService.addSupplier({
        name: value.name ?? '',
        address: value.address ?? '',
        phone: value.phone ?? '',
        email: value.email ?? '',
        status:
          value.status === 'ACTIVE' || value.status === 'INACTIVE'
            ? value.status
            : 'ACTIVE'
      });
      this.router.navigate(['/suppliers']);
    }
  }

  cancelar() {
    this.router.navigate(['/suppliers']);
  }
}