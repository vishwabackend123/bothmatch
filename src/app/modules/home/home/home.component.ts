import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  callFor = true;
  blueImgClick: boolean = false;
  headerTabIndex: number = 0;
  constructor() {
  
  }

  ngOnInit(): void {
  }

  blueImageClicked(e: any) {
    this.blueImgClick = e;
  }
  headerTabChange(e: any) {
    this.headerTabIndex = e;
  }
}