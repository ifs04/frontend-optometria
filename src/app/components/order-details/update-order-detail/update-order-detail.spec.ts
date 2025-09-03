import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderDetail } from './update-order-detail';

describe('UpdateOrderDetail', () => {
  let component: UpdateOrderDetail;
  let fixture: ComponentFixture<UpdateOrderDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrderDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrderDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
