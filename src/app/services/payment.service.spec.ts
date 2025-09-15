import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';



describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    paymentService = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(paymentService).toBeTruthy();
  });
});
