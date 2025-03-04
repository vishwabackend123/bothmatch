import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderSliderComponent } from './home/components/header-slider/header-slider.component';
import { ResumeUploadComponent } from './home/components/resume-upload/resume-upload.component';
import { SliderModule } from 'src/app/shared/slider/slider.module';
import { ChallengesSolutionComponent } from './home/components/challenges-solution/challenges-solution.component';
import { FederalJobsComponent } from './home/components/federal-jobs/federal-jobs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {NgxPrintModule} from 'ngx-print';
import { JobRepComponent } from './home/components/jobrep/jobrep.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AboutUsComponent } from './home/components/about-us/about-us.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { FooterComponent } from '../layout/layout/components/footer/footer.component';
import { CareerAdvancement } from './home/components/career-advancement/career-advancement.component';
import { CandidateCoachMatch } from './home/components/candidate-coach-match/candidate-coach-match.component';
import { ViewMatchedCoaches } from './home/components/view-matched-coaches/view-matched-coaches.component';
import { CoachLoginComponent } from './home/components/coach-login/coach-login.component';
import { CoachProfileComponent } from './home/components/coach-profile/coach-profile.component';
import { CoachExpertiseComponent } from './home/components/coach-expertise/coach-expertise.component';
import { USCompanyMatchStep3FormComponent } from './home/components/us-company-match-step3-form/us-company-match-step3-form.component';
import { HeaderComponent } from '../layout/layout/components/header/header.component';
import { MatchComponent } from './home/components/match/match.component';
import { ForgotPasswordComponent } from './home/components/forgot-password/forgot-password.component';
import { EmployerComponent } from './home/components/employer/employer.component';
import { EmployerProfileComponent } from './home/components/employer-profile/employer-profile.component';
import { EmployerLoginComponent } from './home/components/employer-login/employer-login.component';
import { SubscriptionPaymentComponent } from './home/components/subscription-payment/subscription-payment.component';
import { OpenJobsComponent } from './home/components/employer/openjobs/openjobs.component';
import { CurateJobsComponent } from './home/components/employer/curatejobs/curatejobs.component';
import { SubmittedResumeComponent } from './home/components/employer/submittedresume/submittedresume.component';
import { RecruitingOverviewComponent } from './home/components/employer/recruiting-overview/recruiting-overview.component';
import { Step2CurateJobsComponent } from './home/components/employer/step2-curate-jobs/step2-curate-jobs.component';
import { Step3ReviewAndPayComponent } from './home/components/employer/step3-review-and-pay/step3-review-and-pay.component';
import { SubmitResumeComponent } from './home/components/submit-resume/submit-resume.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [HomeComponent, HeaderSliderComponent, ResumeUploadComponent, ChallengesSolutionComponent, FederalJobsComponent, JobRepComponent, AboutUsComponent,FooterComponent,
    CareerAdvancement,CandidateCoachMatch,ViewMatchedCoaches,CoachLoginComponent,CoachProfileComponent,CoachExpertiseComponent,USCompanyMatchStep3FormComponent,HeaderComponent, MatchComponent, ForgotPasswordComponent
    ,EmployerComponent,EmployerProfileComponent,EmployerLoginComponent,SubscriptionPaymentComponent,OpenJobsComponent,CurateJobsComponent,SubmittedResumeComponent,RecruitingOverviewComponent
    ,Step2CurateJobsComponent,Step3ReviewAndPayComponent, SubmitResumeComponent,SubmitResumeComponent],
  imports: [
    CommonModule,
    SliderModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxPrintModule,
    NgDragDropModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    NgxCaptchaModule,
    AngularDraggableModule,
    NgbModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class HomeModule {

}
