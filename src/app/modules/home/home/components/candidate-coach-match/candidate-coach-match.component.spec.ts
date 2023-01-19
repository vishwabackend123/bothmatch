import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCoachMatch } from './candidate-coach-match.component';

describe('CandidateCoachMatch', () => {
  let component: CandidateCoachMatch;
  let fixture: ComponentFixture<CandidateCoachMatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateCoachMatch ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCoachMatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
