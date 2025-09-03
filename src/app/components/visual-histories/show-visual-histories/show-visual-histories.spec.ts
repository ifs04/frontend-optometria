import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVisualHistories } from './show-visual-histories';

describe('ShowVisualHistories', () => {
  let component: ShowVisualHistories;
  let fixture: ComponentFixture<ShowVisualHistories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowVisualHistories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVisualHistories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
