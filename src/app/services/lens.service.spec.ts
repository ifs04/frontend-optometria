import { TestBed } from '@angular/core/testing';

import { LensService } from './lens.service';

describe('LensService', () => {
  let lensService: LensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    lensService = TestBed.inject(LensService);
  });

  it('should be created', () => {
    expect(lensService).toBeTruthy();
  });
});
