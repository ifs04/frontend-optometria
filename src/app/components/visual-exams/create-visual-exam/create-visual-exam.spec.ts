import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVisualExam } from './create-visual-exam';

describe('CreateVisualExam', () => {
  let component: CreateVisualExam;
  let fixture: ComponentFixture<CreateVisualExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVisualExam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVisualExam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
