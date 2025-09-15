import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';


describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    orderService = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(orderService).toBeTruthy();
  });
});
