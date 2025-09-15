import { TestBed } from '@angular/core/testing';
import { OptometristService } from './optometrist.service';



describe('OptometristService', () => {
  let optometristService: OptometristService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    optometristService = TestBed.inject(OptometristService);
  });

  it('should be created', () => {
    expect(optometristService).toBeTruthy();
  });
});
