import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges-solution',
  templateUrl: './challenges-solution.component.html',
  styleUrls: ['./challenges-solution.component.scss']
})

export class ChallengesSolutionComponent implements OnInit {
  @Output() goToTopJobs = new EventEmitter<number>();
  @Output() headerTabChange = new EventEmitter<number>();
  @ViewChild('imgTag') selectData: ElementRef<HTMLInputElement> | undefined;
  isLoading = false;
  callFor = true;
  constructor(
    private router: Router,
    private elRef:ElementRef
  ) {

  }
  tabIndex = 0;
  height = 0;
  ourMissionImag: string = "https://res.cloudinary.com/dprocdn/image/upload/v1654238203/bg-right-new_u4szrr.jpg";
  ngOnInit(): void {
    this.setImageHeight("");
    this.changeOurMissionImage();
  }

  tabChange(index: number): void {
    this.tabIndex = index;
    this.setImageHeight("");
  }

  setImageHeight(event: any) {
    if ((event == "") || (event && event.target && event.target.innerWidth > 767)) {
      let that = this;
      setTimeout(function () {
      
        if (document.getElementsByClassName('my-img')[0]?.clientHeight > 0) {
          that.height = document.getElementsByClassName('my-img')[0]?.clientHeight - document.getElementsByClassName('my-head')[0]?.clientHeight;
        } else {
          that.isLoading = false;
          that.height = 624;
        }
      }, 100);
    }
  }

  changeOurMissionImage() {
    let that = this;
    setTimeout(function () {
      that.ourMissionImag = "assets/images/Layers-v.png";
    }, 15000);
  }
  goTopJobs() {
    this.goToTopJobs.emit(Math.random() * 1000);
  }
  goToJobRep() {
    this.router.navigate(['/jobrep']);
    this.headerTabChange.emit(1);
  }
}

