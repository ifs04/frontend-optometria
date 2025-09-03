import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeliveries } from './show-deliveries';

describe('ShowDeliveries', () => {
  let component: ShowDeliveries;
  let fixture: ComponentFixture<ShowDeliveries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDeliveries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDeliveries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
