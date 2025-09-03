import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLens } from './update-lens';

describe('UpdateLens', () => {
  let component: UpdateLens;
  let fixture: ComponentFixture<UpdateLens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLens);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
