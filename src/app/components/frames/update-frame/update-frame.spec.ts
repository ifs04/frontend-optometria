import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFrame } from './update-frame';

describe('UpdateFrame', () => {
  let component: UpdateFrame;
  let fixture: ComponentFixture<UpdateFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
