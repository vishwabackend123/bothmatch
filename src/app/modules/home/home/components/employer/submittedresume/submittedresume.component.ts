import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submittedresume',
  templateUrl: './submittedresume.component.html',
  styleUrls: ['./submittedresume.component.scss']
})
export class SubmittedResumeComponent implements OnInit {
  Arr = Array; //Array type captured in a variable
  num:number = 20;
  siteKey: any = "6LcD6aAcAAAAAFucR0IcVnwv4AuVDve7wEbN0dnd";
  @Output() changeTab = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }
}
