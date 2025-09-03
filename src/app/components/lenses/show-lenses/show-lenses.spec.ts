import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLenses } from './show-lenses';

describe('ShowLenses', () => {
  let component: ShowLenses;
  let fixture: ComponentFixture<ShowLenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLenses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
