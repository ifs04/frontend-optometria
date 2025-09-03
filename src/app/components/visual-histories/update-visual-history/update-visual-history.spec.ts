import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisualHistory } from './update-visual-history';

describe('UpdateVisualHistory', () => {
  let component: UpdateVisualHistory;
  let fixture: ComponentFixture<UpdateVisualHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVisualHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVisualHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
