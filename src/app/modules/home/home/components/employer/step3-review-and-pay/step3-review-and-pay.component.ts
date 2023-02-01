import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step3-review-and-pay',
  templateUrl: './step3-review-and-pay.component.html',
  styleUrls: ['./step3-review-and-pay.component.scss']
})
export class Step3ReviewAndPayComponent implements OnInit {
  Arr = Array; //Array type captured in a variable
  num:number = 12 ;
  showDemo: any = true;

  constructor() { }
  
  
  ngOnInit(): void {
  }
}
