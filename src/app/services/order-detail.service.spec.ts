import { TestBed } from '@angular/core/testing';

import { OrderDetailService } from './order-detail.service';

describe('OrderDetailService', () => {
  let orderDetailService: OrderDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    orderDetailService = TestBed.inject(OrderDetailService);
  });

  it('should be created', () => {
    expect(orderDetailService).toBeTruthy();
  });
});
