import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USCompanyMatchStep3FormComponent } from './us-company-match-step3-form.component';

describe('USCompanyMatchStep3FormComponent', () => {
  let component: USCompanyMatchStep3FormComponent;
  let fixture: ComponentFixture<USCompanyMatchStep3FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USCompanyMatchStep3FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USCompanyMatchStep3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
