import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitResumeComponent } from './submit-resume.component';

describe('SubmitResumeComponent', () => {
  let component: SubmitResumeComponent;
  let fixture: ComponentFixture<SubmitResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
