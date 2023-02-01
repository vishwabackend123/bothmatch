import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.scss']
})
export class EmployerLoginComponent implements OnInit {
  siteKey: any;
  @Output() changeTab = new EventEmitter<number>();
  constructor() { 
    this.siteKey = environment.siteKey
  }

  ngOnInit(): void {
  }
  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }
}
