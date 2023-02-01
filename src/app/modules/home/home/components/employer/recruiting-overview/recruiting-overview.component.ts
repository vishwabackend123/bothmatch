import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recruiting-overview',
  templateUrl: './recruiting-overview.component.html',
  styleUrls: ['./recruiting-overview.component.scss']
})
export class RecruitingOverviewComponent implements OnInit {
  siteKey: any = "6LcD6aAcAAAAAFucR0IcVnwv4AuVDve7wEbN0dnd";
  Arr = Array; //Array type captured in a variable
  num:number = 20;
  @Output() changeTab = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }
}
