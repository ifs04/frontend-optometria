import { TestBed } from '@angular/core/testing';
import { VisualHistoryService } from './visual-history.service';


describe('VisualHistoryService', () => {
  let visualHistoryService: VisualHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    visualHistoryService = TestBed.inject(VisualHistoryService);
  });

  it('should be created', () => {
    expect(visualHistoryService).toBeTruthy();
  });
});
