import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFrames } from './show-frames';

describe('ShowFrames', () => {
  let component: ShowFrames;
  let fixture: ComponentFixture<ShowFrames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFrames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFrames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
