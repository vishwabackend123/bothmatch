import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resume-upload',
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.scss']
})
export class ResumeUploadComponent implements OnInit {
  slideConfig = { "slidesToShow": 5, "slidesToScroll": 1 };
  @Output() blueImageClicked = new EventEmitter<number>();
  blueImage:string ="BothBlue.PNG";
  constructor() { }

  ngOnInit(): void {
    this.changeBlueImage();
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
  onImageClick() {
    this.blueImageClicked.emit(Math.random() * 1000);
  }
  changeBlueImage(){
    let that = this;
    setTimeout(function() { 
      that.blueImage = "CurateBlue.PNG";
    }, 15000);
  }
}
