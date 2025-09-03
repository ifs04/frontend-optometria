import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOptometrist } from './create-optometrist';

describe('CreateOptometrist', () => {
  let component: CreateOptometrist;
  let fixture: ComponentFixture<CreateOptometrist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOptometrist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOptometrist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
