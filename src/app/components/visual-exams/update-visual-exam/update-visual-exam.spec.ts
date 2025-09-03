import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisualExam } from './update-visual-exam';

describe('UpdateVisualExam', () => {
  let component: UpdateVisualExam;
  let fixture: ComponentFixture<UpdateVisualExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVisualExam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVisualExam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
