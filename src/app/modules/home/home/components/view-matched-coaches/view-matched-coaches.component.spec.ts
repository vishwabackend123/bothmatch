import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMatchedCoaches } from './view-matched-coaches.component';

describe('ViewMatchedCoaches', () => {
  let component: ViewMatchedCoaches;
  let fixture: ComponentFixture<ViewMatchedCoaches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMatchedCoaches ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMatchedCoaches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
