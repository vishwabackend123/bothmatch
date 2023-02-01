import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilesService } from 'src/app/core/services/files.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-jobrep',
  templateUrl: './jobrep.component.html',
  styleUrls: ['./jobrep.component.scss']
})
export class JobRepComponent implements OnInit, OnChanges {

  @Input() userData: any;
  imageData: any = [];
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



  tabIndex = 0;
  coachTabIndex = 0;
  enrollmentTabIndex = 0;
  slide = 0;
  userType:string;
  constructor(
    public fun: FunctionService,
    public auth: AuthService,
    public toast: ToastrService,
    public fileService: FilesService
  ) {
    let outerTab = localStorage.getItem('tabOuter');
    let innerTab = localStorage.getItem('tabInner');
    // localStorage.removeItem('jSlideValue')
    
    if (outerTab === 'tab_0') {
      this.tabIndex = 0
    }
    else if (outerTab === 'tab_1') {
      this.tabIndex = 1
      if (innerTab === 'tab_0')
        this.coachTabIndex = 0
      else if (innerTab === 'tab_1') {
        this.coachTabIndex = 1
      }
      else if (innerTab === 'tab_2') {
        this.coachTabIndex = 2
      }
    }
    else if (outerTab === 'tab_2') {
      this.tabIndex = 2
    }
    else {
      this.tabIndex = 0
      this.coachTabIndex = 0
    }
  }

  ngOnInit() {
    this.setImageData();
    window.scrollTo(0, 0);
    this.userType="jobrep"
  }

  tabChange(index: number): void {
    
    this.tabIndex = index;
    localStorage.setItem('tabOuter', `tab_${this.tabIndex}`)
    if (index == 0) {
      this.setImageData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    
    console.log(changes);
  }

  innerTabChange(index: number): void {
    // if (this.fun.isLoggedIn) {
    //   this.userProfile();
    //   this.coachTabIndex = index;
    //   localStorage.setItem('tabInner', `tab_${this.coachTabIndex}`)
    // }
    // else {
    //   this.toast.error('Please login or register')
    // }
    // if(loginToken && loginToken != ''){
      console.log('userData =>', this.fun.userData);
      
      if(index === 0){
        this.coachTabIndex = index;
      }
      else if(index === 1){
        this.coachTabIndex = index;
      }
      else if(index === 2){
        let dt = this.fun.userData
        if(dt && dt.name && dt.email && dt.city && dt.country && dt.state && dt.service_summary && dt.image && dt.profile_header && dt.total_years_in_career_service){
          this.coachTabIndex = index;
        }
        else{
          if(this.fun.isLoggedIn){
            this.toast.error('Update Required Fields')
          }
          else{
            this.coachTabIndex = index;
          }
        }
      }
      else{
        this.coachTabIndex = index;
      }
     
      localStorage.setItem('tabInner', `tab_${this.coachTabIndex}`)
    // }
    // else{
    //   this.toast.error('Please Login To Update Your Profile')
    // }
  }
  enrollmentTabChange(index: number): void {
    this.enrollmentTabIndex = index;
  }
  setImageData() {
    this.imageData = [];
    if (localStorage.getItem('jSlideValue') != undefined && localStorage.getItem('jSlideValue') != null && localStorage.getItem('jSlideValue') != '') {
      let current: any = localStorage.getItem('jSlideValue') ? localStorage.getItem('jSlideValue') : '';
      if (JSON.parse(current).slide == 9) {
        // this.imageData.push(this.images[this.images.length-1]);
        this.imageData.push(this.images[9]);
        this.imageData.push(this.images[6]);
        this.imageData.push(this.images[3]);
        this.slide = 0;
        localStorage.setItem('jSlideValue', JSON.stringify({ "slide": this.slide }));
      } else {
        this.slide = JSON.parse(current).slide;
        for (let i = this.slide; i <= this.slide + 2; i++) {
          this.imageData.push(this.images[i]);
        }
        localStorage.setItem('jSlideValue', JSON.stringify({ "slide": this.slide + 3 }));
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        this.imageData.push(this.images[i]);
      }
      localStorage.setItem('jSlideValue', JSON.stringify({ "slide": 3 }));
    }
  }


  changeCareerProfessionalChildTab(tab: any) {
    this.coachTabIndex = tab;
    if (this.coachTabIndex) {
       this.userProfile()
    } else {
      console.log('err');
    }
  }


  userProfile() {
    this.fun.getUserData().then((res: any) => {
      if (res) {
        this.fun.userData = res;
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }
}
