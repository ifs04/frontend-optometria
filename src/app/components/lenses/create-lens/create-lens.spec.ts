import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLens } from './create-lens';

describe('CreateLens', () => {
  let component: CreateLens;
  let fixture: ComponentFixture<CreateLens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLens);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
