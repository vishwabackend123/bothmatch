import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-curatejobs',
  templateUrl: './curatejobs.component.html',
  styleUrls: ['./curatejobs.component.scss']
})
export class CurateJobsComponent implements OnInit {
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
