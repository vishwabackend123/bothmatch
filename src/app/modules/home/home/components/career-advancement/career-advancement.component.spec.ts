import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerAdvancement } from './career-advancement.component';

describe('CareerAdvancement', () => {
  let component: CareerAdvancement;
  let fixture: ComponentFixture<CareerAdvancement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerAdvancement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerAdvancement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
