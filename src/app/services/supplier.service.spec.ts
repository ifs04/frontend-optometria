import { TestBed } from '@angular/core/testing';
import { SupplierService } from './supplier.service';



describe('SupplierService', () => {
  let supplierService: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    supplierService = TestBed.inject(SupplierService);
  });

  it('should be created', () => {
    expect(supplierService).toBeTruthy();
  });
});
