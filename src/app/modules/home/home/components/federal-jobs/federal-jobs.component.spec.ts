import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalJobsComponent } from './federal-jobs.component';

describe('FederalJobsComponent', () => {
  let component: FederalJobsComponent;
  let fixture: ComponentFixture<FederalJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederalJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


function recaptchaReady () {
  grecaptcha.render('myrecaptcha', {
  'sitekey': '6Lc7JBAUAAAAANrF3CJaIjt7T9IEFSmd85Qpc4gj',
  'expired-callback': function () {
    grecaptcha.reset();
    console.log('recatpcha');
  }
});
}