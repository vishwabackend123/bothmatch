import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  slide = 0;
// slideOptions={
//     loop:true,
//     items:10,
//     margin:20,
//     duration:1000,
//     timer:6000,
//     // banner:false,
//     responsive:[
//       {breakPoint:1200,items:1},
//       {breakPoint:900,items:1},
//       {breakPoint:0,items:1}
//     ]
//   };

  imageData = [
             { image:'assets/images/kimberly_wright.png',name:'Kimberly Wright'}
            ,{ image:'assets/images/lisa_ross.png',name:'Lisa Ross'}
            ,{ image:'assets/images/paul_glover.png',name:'Paul Glover'}
            ,{ image:'assets/images/ruth_kerr.png',name:'Ruth Kerr'}
            ,{ image:'assets/images/sean_hill.png',name:'Sean Hill'}
            ,{ image:'assets/images/jake_clark.png',name:'Jake Clark'}
            ,{ image:'assets/images/ava_quinn.png',name:'Ava Quinn'}
            ,{ image:'assets/images/heather_chang.png',name:'Heather Chang'}
            ,{ image:'assets/images/ryan_william.png',name:'Ryan William'}
            ,{ image:'assets/images/brain_morrison.png',name:'Brian Morrison'}
            ]
  constructor(public router: Router) { 
  }


  ngOnInit(): void {
    if(localStorage.getItem('footerSlideValue') != undefined && localStorage.getItem('footerSlideValue') != null && localStorage.getItem('footerSlideValue') != ''){
      let current:any = localStorage.getItem('footerSlideValue') ? localStorage.getItem('footerSlideValue') :'';
        if(JSON.parse(current).slide == 9){
          localStorage.setItem('footerSlideValue',JSON.stringify({"slide":0}));
            this.slide = 0;
        } else{
           this.slide = JSON.parse(current).slide + 1;       
           localStorage.setItem('footerSlideValue',JSON.stringify({"slide":this.slide}));
        }
    } else {
      this.slide = 0;
      localStorage.setItem('footerSlideValue',JSON.stringify({"slide":0}));
    }
}
 
 routing(){
   this.router.navigate(['/jobrep']);
}
  
}