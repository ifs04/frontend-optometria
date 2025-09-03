import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderDetails } from './show-order-details';

describe('ShowOrderDetails', () => {
  let component: ShowOrderDetails;
  let fixture: ComponentFixture<ShowOrderDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOrderDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrderDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
