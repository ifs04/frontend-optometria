import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderDetail } from './create-order-detail';

describe('CreateOrderDetail', () => {
  let component: CreateOrderDetail;
  let fixture: ComponentFixture<CreateOrderDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrderDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrderDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
