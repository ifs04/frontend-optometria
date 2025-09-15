import { TestBed } from '@angular/core/testing';

import { FrameService } from './frame.service';

describe('FrameService', () => {
  let frameService: FrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    frameService = TestBed.inject(FrameService);
  });

  it('should be created', () => {
    expect(frameService).toBeTruthy();
  });
});
