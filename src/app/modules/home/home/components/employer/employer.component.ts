import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit, OnChanges {

  @Input() userData: any;
  imageData: any = [];
  Arr = Array; //Array type captured in a variable
  num: number = 20;
  SubscriptionStep1 = true;
  SubscriptionStep2 = false;
  EmplooyeTab: string = '';
  SubscriptionStep3 = false;
  images = [
    { image: 'assets/images/kimberly_wright.png', name: 'Kimberly Wright', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/ryan_william.png', name: 'Ryan William', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/paul_glover.png', name: 'Paul Glover', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/heather_chang.png', name: 'Heather Chang', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/ava_quinn.png', name: 'Ava Quinn', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/jake_clark.png', name: 'Jake Clark', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/brain_morrison.png', name: 'Brian Morrison', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/lisa_ross.png', name: 'Lisa Ross', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/ruth_kerr.png', name: 'Ruth Kerr', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
    , { image: 'assets/images/sean_hill.png', name: 'Sean Hill', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  ]



  mainTabIndex = 0;
  recruitingInnerTabIndex = 0;
  employerInnerTabIndex = 0;
  recruitingDashboardTabIndex = 0;
  subscriptionTabIndex = 0;
  employerMatrixTabIndex = 0;
  slide = 0;
  constructor(
    public fun: FunctionService,
    public auth: AuthService,
    private router: Router,
    public toast: ToastrService
  ) {
    // let mainOuterTab = localStorage.getItem('mainOuterTab');
    // let recruitingInnerTabIndex = localStorage.getItem('recruitingInnerTab');
    // let employerInnerTab = localStorage.getItem('employerInnerTab');
    // let recruitingDashboardTab = localStorage.getItem('recruitingDashboardTab');
    // let subscriptionTab = localStorage.getItem('subscriptionTab');
    // // console.log('innerTab => ', innerTab, outerTab);
    // if (mainOuterTab === 'tab_0') {
    //   this.mainTabIndex = 0;
    //   this.recruitingInnerTabIndex = 0;
    // }
    // else {
    //   this.mainTabIndex = 0;
    //   this.recruitingInnerTabIndex = 0;
    // }
    // // employer enrollment tabs
    // if (mainOuterTab === 'tab_1') {
    //   this.mainTabIndex = 1
    //   if (employerInnerTab === 'tab_0')
    //     this.employerInnerTabIndex = 0
    //   else if (employerInnerTab === 'tab_1') {
    //     this.employerInnerTabIndex = 1
    //   }
    //   else if (employerInnerTab === 'tab_2') {
    //     this.employerInnerTabIndex = 2;
    //     if (subscriptionTab === 'tab_0')
    //       subscriptionTab = '0';
    //     else if (subscriptionTab === 'tab_1')
    //       subscriptionTab = '1';
    //     else if (subscriptionTab === 'tab_2')
    //       subscriptionTab = '2';
    //     this.subscriptionTabIndex = subscriptionTab == null ? 0 : + subscriptionTab;
    //   }
    //   else {
    //     this.employerInnerTabIndex = 0
    //   }
    // }
    // else {
    //   this.employerInnerTabIndex = 0
    // }
    // // job dashboard-matrics tabs
    // if (mainOuterTab === 'tab_2') {
    //   this.mainTabIndex = 2
    //   if (recruitingDashboardTab === 'tab_0')
    //     this.recruitingDashboardTabIndex = 0
    //   else if (recruitingDashboardTab === 'tab_1') {
    //     this.recruitingDashboardTabIndex = 1
    //   }
    //   else if (recruitingDashboardTab === 'tab_2') {
    //     this.recruitingDashboardTabIndex = 2
    //   }
    //   else {
    //     this.recruitingDashboardTabIndex = 0
    //   }
    // }
    // else {
    //   this.recruitingDashboardTabIndex = 0;
    // }
    this.EmplooyeTab = this.router.getCurrentNavigation()?.extras?.state?.EmployerTab;
    if (this.EmplooyeTab && this.EmplooyeTab != '') {
      this.newTabChangeHome();

    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  newTabChangeHome() {
    if (this.EmplooyeTab === 'first') {
      this.mainTabIndex = 0;
    } else if (this.EmplooyeTab === 'second') {
      this.mainTabIndex = 1;
    } else if (this.EmplooyeTab === 'third') {
      this.mainTabIndex = 0;
      this.innerTabChange(1,'employerInnerTab');
    } else {
      this.mainTabIndex = 0;
    }
  }
  mainTabChange(index: number): void {
    this.mainTabIndex = index;
    // localStorage.setItem('mainOuterTab', `tab_${this.mainTabIndex}`)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  innerTabChange(index: number, innerTab: string): void {
    if (innerTab == 'recruitingInnerTab') {
      this.recruitingInnerTabIndex = index;
      // localStorage.setItem('recruitingInnerTab', `tab_${index}`)
    }
    else if (innerTab == 'employerInnerTab') {
      // if (index == 2) {
      // if (localStorage.getItem('subscriptionTab') != undefined && localStorage.getItem('subscriptionTab') != null) {
      //   let subscriptionTab = localStorage.getItem('subscriptionTab');
      //   if (subscriptionTab === 'tab_0')
      //     subscriptionTab = '0';
      //   else if (subscriptionTab === 'tab_1')
      //     subscriptionTab = '1';
      //   else if (subscriptionTab === 'tab_2')
      //     subscriptionTab = '2';
      //   this.subscriptionTabIndex = subscriptionTab == null ? 0 : + subscriptionTab;
      // }
      // else {
      //   this.subscriptionTabIndex = 0;
      // }
      // localStorage.setItem('subscriptionTab', `tab_${this.subscriptionTabIndex}`);
      // }
      this.employerInnerTabIndex = index;
      // localStorage.setItem('employerInnerTab', `tab_${index}`);
    }
    else if (innerTab == 'recruitingDashboardTab') {
      this.recruitingDashboardTabIndex = index;
      // localStorage.setItem('recruitingDashboardTab', `tab_${index}`)
    }
    else if (innerTab == 'employerMatrixTab') {

      this.employerMatrixTabIndex = index;
    }
  }
  subscriptionTabChange(index: number): void {
    this.subscriptionTabIndex = index;
    // localStorage.setItem('subscriptionTab', `tab_${this.subscriptionTabIndex}`);
  }

  changeChildTab(tab: any, action: string) {


    if (action == 'employerInnerTab') {
      this.employerInnerTabIndex = tab;
      // localStorage.setItem('employerInnerTab', `tab_${tab}`)
    }
    else if (action == 'recruitingDashboardTab') {
      this.recruitingDashboardTabIndex = tab;
      // localStorage.setItem('recruitingDashboardTab', `tab_${tab}`)
    }
    // if (tab === 22 || tab === 11) {
    //   this.subscriptionTabIndex = tab
    //   this.coachTabIndex = 2
    // } else {
    //   this.coachTabIndex = tab;

    //   if (this.coachTabIndex) {
    //     this.userProfile()
    //   } else {
    //     console.log('err');
    //   }
    // }

  }
}
