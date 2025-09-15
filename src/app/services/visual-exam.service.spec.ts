import { TestBed } from '@angular/core/testing';
import { VisualExamService } from './visual-exam.service';



describe('VisualExamService', () => {
  let visualExamService: VisualExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    visualExamService = TestBed.inject(VisualExamService);
  });

  it('should be created', () => {
    expect(visualExamService).toBeTruthy();
  });
});
