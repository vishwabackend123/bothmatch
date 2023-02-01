import { Component,Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent implements OnInit {
  @Output() changeTab = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }

}
