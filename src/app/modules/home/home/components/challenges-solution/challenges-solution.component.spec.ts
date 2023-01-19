import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesSolutionComponent } from './challenges-solution.component';

describe('ChallengesSolutionComponent', () => {
  let component: ChallengesSolutionComponent;
  let fixture: ComponentFixture<ChallengesSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengesSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
