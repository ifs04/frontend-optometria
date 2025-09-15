import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FrameService } from '../../../services/frame.service';


@Component({
  selector: 'app-create-frame',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule],
  templateUrl: './create-frame.html',
  styleUrl: './create-frame.css'
})
export class CreateFrame {
   form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private frameService: FrameService
  ) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      material: ['', Validators.required],
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      supplierId: [0, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
    const value = this.form.value;
    this.frameService.addFrame({
      brand: value.brand ?? '',
      model: value.model ?? '',
      material: value.material ?? '',
      color: value.color ?? '',
      price: value.price ?? 0,
      stock: value.stock ?? 0,
      supplierId: value.supplierId ?? 0,
      image: value.image ?? ''
    });
    this.router.navigate(['/frames']);
    }
  }

  cancelar() {
    this.router.navigate(['/frames']);
  }
}
