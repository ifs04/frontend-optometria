import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOptometrist } from './update-optometrist';

describe('UpdateOptometrist', () => {
  let component: UpdateOptometrist;
  let fixture: ComponentFixture<UpdateOptometrist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOptometrist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOptometrist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
