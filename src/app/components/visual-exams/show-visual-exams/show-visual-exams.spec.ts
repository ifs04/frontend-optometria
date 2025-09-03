import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVisualExams } from './show-visual-exams';

describe('ShowVisualExams', () => {
  let component: ShowVisualExams;
  let fixture: ComponentFixture<ShowVisualExams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowVisualExams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVisualExams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
