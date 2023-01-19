import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-slider',
  templateUrl: './header-slider.component.html',
  styleUrls: ['./header-slider.component.scss']
})
export class HeaderSliderComponent implements OnInit {
  slides = [
    // { img: "assets/images/people-image-11.svg" },
    // { img: "assets/images/people-image-22.svg" },
    // { img: "assets/images/people-image-33.svg" },
    // { img: "assets/images/people-image-44.svg" }
    { img: "assets/images/Row1.PNG" },
    { img: "assets/images/Row2.PNG" },
    { img: "assets/images/Row3.PNG" },
    { img: "assets/images/Row4.PNG" }
  ];
  slide : any = 0;
  // slide = Math.floor(Math.random() * 4);
  
  
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('slideValue') != undefined && localStorage.getItem('slideValue') != null && localStorage.getItem('slideValue') != ''){
      let current:any = localStorage.getItem('slideValue') ? localStorage.getItem('slideValue') :'';
        if(JSON.parse(current).slide == 3){
          localStorage.setItem('slideValue',JSON.stringify({"slide":0}));
            this.slide = 0;
        } else{
           this.slide = JSON.parse(current).slide + 1;
           localStorage.setItem('slideValue',JSON.stringify({"slide":this.slide}));
        }
    } else {
       localStorage.setItem('slideValue',JSON.stringify({"slide":0}));
          this.slide = 0;
    }
  }

}


