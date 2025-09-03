import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOptometrists } from './show-optometrists';

describe('ShowOptometrists', () => {
  let component: ShowOptometrists;
  let fixture: ComponentFixture<ShowOptometrists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOptometrists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOptometrists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
