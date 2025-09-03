import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVisualHistory } from './create-visual-history';

describe('CreateVisualHistory', () => {
  let component: CreateVisualHistory;
  let fixture: ComponentFixture<CreateVisualHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVisualHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVisualHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
