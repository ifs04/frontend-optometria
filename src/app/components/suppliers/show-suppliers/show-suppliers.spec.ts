import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSuppliers } from './show-suppliers';

describe('ShowSuppliers', () => {
  let component: ShowSuppliers;
  let fixture: ComponentFixture<ShowSuppliers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSuppliers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSuppliers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
