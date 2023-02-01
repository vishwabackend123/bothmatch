import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilesService } from 'src/app/core/services/files.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-career-advancement',
  templateUrl: './career-advancement.component.html',
  styleUrls: ['./career-advancement.component.scss']
})
export class CareerAdvancement implements OnInit {
  imageData: any = [];
  allServices: any = [];
  allUsers: any = [];
  isLoading: boolean = false
  totalRows: any;
  imagePathUrl: any
  images = []
  // images = [
  //   { image: 'assets/images/kimberly_wright.png', name: 'Kimberly Wright', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/ryan_william.png', name: 'Ryan William', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/paul_glover.png', name: 'Paul Glover', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/heather_chang.png', name: 'Heather Chang', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/ava_quinn.png', name: 'Ava Quinn', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/jake_clark.png', name: 'Jake Clark', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/brain_morrison.png', name: 'Brian Morrison', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/lisa_ross.png', name: 'Lisa Ross', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/ruth_kerr.png', name: 'Ruth Kerr', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  //   , { image: 'assets/images/sean_hill.png', name: 'Sean Hill', title: 'Career Coach & Job Search Strategist', details: 'Helping professionals to identify their career<br>goals and develop an effective resume' }
  // ]
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
  constructor(
    public fileService: FilesService
  ) { }

  ngOnInit(){
    this.getApprovedUsers();
    this.getExpertizeWithoutAuth()
    this.imagePathUrl = environment.imgPathUrl
  }

  getApprovedUsers() { 
    let arrData = []
    this.fileService.getAllUsers().then((res: any) => {
      if (res && res.status) {
        let resData = res.data.data;
        if(resData && resData.length > 0){
          resData.forEach(element => {
            if(element.image && element.name && element.service_summary && element.profile_header ){
              let top3_specialites = []
              if(element.top3_specialites.length){
                element.top3_specialites.forEach(x => {
                  top3_specialites.push(x.service_name)
                })
              }
              let objData = {
                image: environment.imgPathUrl + element.image,
                name: element.name,
                details: element.service_summary,
                title: element.profile_header,
                top3_specialites: top3_specialites.join(', ')
              }
              this.images.push(objData)
            }
          });
          this.setImageData(arrData);
        }
      }
      else {
        console.log('Err somthing went wrong');
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

  setImageData(data: any) {
    this.imageData = [] //get user data for career advancement 
    if(this.images && this.images.length > 0){
      // if (localStorage.getItem('jSlideValue') != undefined && localStorage.getItem('jSlideValue') != null && localStorage.getItem('jSlideValue') != '') {
        // let current: any = localStorage.getItem('jSlideValue') ? localStorage.getItem('jSlideValue') : '';
        let randomValue: any  =  Math.floor(Math.random() * this.images.length); // get random value smaller then image length 
        if(randomValue >= this.images.length-2 && this.images.length > 1){ //get last two value
          this.imageData.push(this.images[this.images.length-2]);
          this.imageData.push(this.images[this.images.length-1]);
        }
        else{
          if(this.images.length > 1){
            for (let i = randomValue; i <=   randomValue + 1  ; i++) {
              let sildeData = this.images[i]
              this.imageData.push(sildeData);
            }
          }
          else{ 
            let sildeData
            this.images.length ?  sildeData = this.images[0] : " " 
            this.imageData.push(sildeData)
          }
        }
      //   if (JSON.parse(current).slide == 9) {
      //     this.imageData.push(this.images[this.images.length-2]);
      //     this.imageData.push(this.images[this.images.length-1]);
      //     this.slide = 0;
      //     localStorage.setItem('jSlideValue', JSON.stringify({ "slide": this.slide }));
      //   } else {
      //     this.slide = JSON.parse(current).slide;
      //     if(this.slide < this.images.length-1){
      //       for (let i = this.slide; i <= this.slide + 1; i++) {
      //         let sildeData = this.images[i]
      //         this.imageData.push(sildeData);
      //       }
      //     }
      //     else{
      //       this.imageData.push(this.images[this.images.length-2]);
      //     this.imageData.push(this.images[this.images.length-1]);
      //     }
      //     localStorage.setItem('jSlideValue', JSON.stringify({ "slide": this.slide + 3 }));
      //   }
      // } else {
      //   for (let i = 0; i <= 1; i++) {
      //     let imgInner = this.images[i]
      //     this.imageData.push(imgInner);
      //   }
      //   localStorage.setItem('jSlideValue', JSON.stringify({ "slide": 3 }));
      // }
      // console.log('this.imageData => ', this.imageData);
    // }
  }
  }

  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }

  getExpertizeWithoutAuth() {
    this.isLoading = true;
    this.fileService.getAllExpertis().then((res: any) => {
      this.isLoading = false;
      if (res && res.status) {
        let data= res.data.data;
        const unique = [...new Map(data.map((m) => [m.service_name, m])).values()];
        let arrayLength = Math.ceil(unique.length/2)
        this.totalRows = new Array(arrayLength);
        this.allServices = unique
      }
      else {
        this.isLoading = false;
        console.log('Err somthing went wrong');
      }
    }).catch((err: any) => {
      this.isLoading = false;
      console.log(err);
    })
  }
}
