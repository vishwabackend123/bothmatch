import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-career-advancement',
  templateUrl: './career-advancement.component.html',
  styleUrls: ['./career-advancement.component.scss']
})
export class CareerAdvancement implements OnInit {
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
  services = [{ name: 'Career Transition' },
  { name: 'Leadership Coaching' },
  { name: 'Certification Assessment' },
  { name: 'Networking Coaching' },
  { name: 'Cover Letter Preparation' },
  { name: 'Personal Branding' },
  { name: 'Education Coaching' },
  { name: 'Personality Assessment' },
  { name: 'Employer Evaluation' },
  { name: 'Profession Assessment' },
  { name: 'Executive Coaching' },
  { name: 'Resume Development' },
  { name: 'Interview Coaching' },
  { name: 'Salary Negotiation' },
  { name: 'Job Match Strategy' },
  { name: 'Skills Assessment' },
  { name: 'Job Tech Strategy' },
  { name: 'Training Assessment' }]

  tabIndex = 0;
  coachTabIndex = 0;
  enrollmentTabIndex = 0;
  slide = 0;
  @Output() changeTab = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    this.setImageData();
  }
  setImageData() {
    this.imageData = [];
    if (localStorage.getItem('jSlideValue') != undefined && localStorage.getItem('jSlideValue') != null && localStorage.getItem('jSlideValue') != '') {
      let current: any = localStorage.getItem('jSlideValue') ? localStorage.getItem('jSlideValue') : '';
      if (JSON.parse(current).slide == 9) {
        this.imageData.push(this.images[9]);
        this.imageData.push(this.images[3]);
        this.slide = 0;
        localStorage.setItem('jSlideValue', JSON.stringify({ "slide": this.slide }));
      } else {
        this.slide = JSON.parse(current).slide;
        for (let i = this.slide; i <= this.slide + 1; i++) {
          this.imageData.push(this.images[i]);
        }
        localStorage.setItem('jSlideValue', JSON.stringify({ "slide": this.slide + 3 }));
      }
    } else {
      for (let i = 0; i <= 1; i++) {
        this.imageData.push(this.images[i]);
      }
      localStorage.setItem('jSlideValue', JSON.stringify({ "slide": 3 }));
    }
  }
  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }
}
