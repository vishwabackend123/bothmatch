import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRepComponent } from './jobrep.component';

describe('JobRepComponent', () => {
  let component: JobRepComponent;
  let fixture: ComponentFixture<JobRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
