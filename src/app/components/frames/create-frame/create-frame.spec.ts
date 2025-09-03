import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFrame } from './create-frame';

describe('CreateFrame', () => {
  let component: CreateFrame;
  let fixture: ComponentFixture<CreateFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
