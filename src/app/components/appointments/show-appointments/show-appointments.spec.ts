import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAppointments } from './show-appointments';

describe('ShowAppointments', () => {
  let component: ShowAppointments;
  let fixture: ComponentFixture<ShowAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAppointments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAppointments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
