import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SupplierI } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier.service';


@Component({
  selector: 'app-show-suppliers',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule],
  templateUrl: './show-suppliers.html',
  styleUrl: './show-suppliers.css',
  encapsulation: ViewEncapsulation.None
})

export class ShowSuppliers {
  suppliers: SupplierI[] = [];
  constructor(private supplierService: SupplierService) {
    this.supplierService.suppliers$.subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }
}