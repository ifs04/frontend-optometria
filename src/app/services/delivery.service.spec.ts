import { TestBed } from '@angular/core/testing';
import { DeliveryService } from './delivery.service';



describe('DeliveryService', () => {
  let deliveryService: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    deliveryService = TestBed.inject(DeliveryService);
  });

  it('should be created', () => {
    expect(deliveryService).toBeTruthy();
  });
});
