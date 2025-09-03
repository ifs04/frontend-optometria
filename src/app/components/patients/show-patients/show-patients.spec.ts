import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPatients } from './show-patients';

describe('ShowPatients', () => {
  let component: ShowPatients;
  let fixture: ComponentFixture<ShowPatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPatients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPatients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
